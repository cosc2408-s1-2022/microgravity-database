package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.InvalidExperimentAttachmentException;
import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.*;
import com.rmit.mgdb.payload.ResultsResponse;
import com.rmit.mgdb.payload.SaveExperimentPersonRequest;
import com.rmit.mgdb.payload.SaveExperimentRequest;
import com.rmit.mgdb.repository.ExperimentRepository;
import org.apache.commons.io.FilenameUtils;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Arrays;
import java.util.Optional;

import static com.rmit.mgdb.util.Constants.DEFAULT_PAGE_SIZE;

@Service
public class ExperimentService {

    @PersistenceContext
    private final EntityManager entityManager;
    private final SearchSession searchSession;

    private final ExperimentRepository experimentRepository;
    private final ExperimentPublicationService experimentPublicationService;
    private final ExperimentAttachmentService experimentAttachmentService;
    private final MissionService missionService;
    private final ForCodeService forCodeService;
    private final SeoCodeService seoCodeService;
    private final PersonService personService;
    private final RoleService roleService;
    private final ToaService toaService;
    private final ExperimentPersonService experimentPersonService;

    @Autowired
    public ExperimentService(EntityManager entityManager,
                             ExperimentRepository experimentRepository,
                             ExperimentPublicationService experimentPublicationService,
                             ExperimentAttachmentService experimentAttachmentService,
                             MissionService missionService, ForCodeService forCodeService,
                             SeoCodeService seoCodeService, PersonService personService, RoleService roleService,
                             ToaService toaService,
                             ExperimentPersonService experimentPersonService) {
        this.entityManager = entityManager;
        this.searchSession = Search.session(entityManager);
        this.experimentRepository = experimentRepository;
        this.experimentPublicationService = experimentPublicationService;
        this.experimentAttachmentService = experimentAttachmentService;
        this.missionService = missionService;
        this.forCodeService = forCodeService;
        this.seoCodeService = seoCodeService;
        this.personService = personService;
        this.roleService = roleService;
        this.toaService = toaService;
        this.experimentPersonService = experimentPersonService;
    }

    public Experiment getExperimentById(Long id) {
        return experimentRepository.findById(id)
                                   .orElseThrow(() -> new NotFoundException("Experiment could not be found.", id));
    }

    public Experiment saveExperiment(SaveExperimentRequest experimentRequest) {
        Experiment experiment = new Experiment();
        Long id = experimentRequest.getId();
        if (id != null) {
            Experiment existingExperiment = getExperimentById(id);
            experiment.setId(id);
            experiment.setApproved(existingExperiment.isApproved());
            experiment.setDeleted(existingExperiment.isDeleted());
            experiment.setCreatedAt(existingExperiment.getCreatedAt());
            experimentPersonService.removeAllExperimentPeople(id);
            experimentPublicationService.removeAllExperimentPublications(id);
            experimentAttachmentService.deleteAllByExperimentId(id);
        }
        experiment.setTitle(experimentRequest.getTitle());
        experiment.setToa(toaService.getToaById(experimentRequest.getToaId()));
        experiment.setLeadInstitution(experimentRequest.getLeadInstitution());
        experiment.setExperimentAim(experimentRequest.getExperimentAim());
        experiment.setExperimentObjective(experimentRequest.getExperimentObjective());
        Mission mission = missionService.getMissionById(experimentRequest.getMissionId());
        experiment.setMission(mission);
        experiment.setPlatform(mission.getPlatform());
        experiment.setForCode(forCodeService.getForCodeById(experimentRequest.getForCodeId()));
        experiment.setSeoCode(seoCodeService.getSeoCodeById(experimentRequest.getSeoCodeId()));
        experimentRepository.saveAndFlush(experiment);

        SaveExperimentPersonRequest[] personRequests = experimentRequest.getExperimentPersonRequests();
        if (personRequests != null && personRequests.length > 0) {
            experiment.setPeople(Arrays.stream(personRequests).map(personRequest -> {
                Person person = personService.getPersonById(personRequest.getPersonId());
                Role role = roleService.getRoleById(personRequest.getRoleId());
                return experimentPersonService.addExperimentPerson(experiment, person, role);
            }).toList());
        }

        ExperimentPublication[] publications = experimentRequest.getExperimentPublications();
        if (publications != null && publications.length > 0) {
            experiment.setExperimentPublications(Arrays.stream(publications).map(publication -> {
                List<ExperimentPublicationAuthor> authors = publication.getAuthors();
                if (authors != null && authors.size() > 0)
                    publication.setAuthors(
                            authors.stream().map(experimentPublicationService::saveExperimentPublicationAuthor)
                                   .toList());

                publication.setExperiment(experiment);
                return experimentPublicationService.saveExperimentPublication(publication);
            }).toList());
        }

        List<ExperimentAttachment> experimentAttachments = new ArrayList<>();
        MultipartFile[] experimentAttachmentFiles = experimentRequest.getExperimentAttachmentFiles();
        if (experimentAttachmentFiles != null && experimentAttachmentFiles.length > 0) {
            experimentAttachments.addAll(Arrays.stream(experimentAttachmentFiles).map(file -> {
                String originalFileName = Objects.requireNonNull(file.getOriginalFilename());
                String fileExtension = FilenameUtils.getExtension(originalFileName);
                if (originalFileName.isEmpty() || fileExtension.isEmpty())
                    throw new InvalidExperimentAttachmentException("Could not acquire filename or extension.",
                                                                   originalFileName);
                if (file.isEmpty())
                    throw new InvalidExperimentAttachmentException("File is empty.", originalFileName);

                String finalFileName =
                        (LocalDateTime.now() + "DT" + FilenameUtils.removeExtension(originalFileName)).replaceAll(
                                "[\\p{Punct}\\s]+", "_") + "." + fileExtension;
                String mediaType = Objects.requireNonNull(file.getContentType());
                Path parent = Paths.get(mediaType.equals(MediaType.APPLICATION_PDF_VALUE) ? "documents" : "images");
                try {
                    Files.copy(file.getInputStream(), parent.resolve(finalFileName));
                } catch (IOException ignored) {
                    throw new InvalidExperimentAttachmentException("Could not create file.", originalFileName);
                }

                ExperimentAttachment experimentAttachment = new ExperimentAttachment();
                experimentAttachment.setExperiment(experiment);
                experimentAttachment.setMediaType(mediaType);
                experimentAttachment.setFilename(finalFileName);
                experimentAttachmentService.save(experimentAttachment);
                return experimentAttachment;
            }).toList());
        }
        Long[] experimentAttachmentIds = experimentRequest.getExperimentAttachmentIds();
        if (experimentAttachmentIds != null && experimentAttachmentIds.length > 0) {
            experimentAttachments.addAll(Arrays.stream(experimentRequest.getExperimentAttachmentIds())
                                               .map(experimentAttachmentService::findById).toList());
        }
        experiment.setExperimentAttachments(experimentAttachments);

        searchSession.massIndexer().start();
        return experiment;
    }

    /**
     * Get all experiments, optionally paginated.
     */
    public ResultsResponse<Experiment> getExperiments(Optional<Integer> page, Optional<Integer> size) {
        Page<Experiment> experiments;
        if (page.isPresent() || size.isPresent()) {
            int pageInt = page.orElse(1) - 1;
            int sizeInt = size.orElse(DEFAULT_PAGE_SIZE);
            experiments =
                    experimentRepository.findExperimentsBy(PageRequest.of(pageInt, sizeInt));
            return new ResultsResponse<>(experiments.getTotalElements(), experiments.getTotalPages(), pageInt + 1,
                                         sizeInt,
                                         experiments.getContent());
        } else {
            experiments =
                    experimentRepository.findExperimentsBy(Pageable.ofSize(DEFAULT_PAGE_SIZE));
            return new ResultsResponse<>(experiments.getTotalElements(), experiments.getTotalPages(),
                                         experiments.getTotalPages() + 1,
                                         DEFAULT_PAGE_SIZE, experiments.getContent());
        }
    }

    public void toggleExperimentDelete(Long id) {
        Experiment experiment = getExperimentById(id);
        experiment.setDeleted(!experiment.isDeleted());
        experimentRepository.saveAndFlush(experiment);
        searchSession.massIndexer().start();
    }

    public void approveExperiment(Long id) {
        Experiment experiment = getExperimentById(id);
        experiment.setApproved(true);
        experimentRepository.saveAndFlush(experiment);
        searchSession.massIndexer().start();
    }

}
