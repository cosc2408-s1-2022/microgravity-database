package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.InvalidExperimentAttachmentException;
import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.Activity.Activities;
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
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;

import static com.rmit.mgdb.util.Constants.DEFAULT_PAGE_SIZE;

@Service
public class ExperimentService {

    @PersistenceContext
    private final EntityManager entityManager;
    private final SearchSession searchSession;

    private final ExperimentRepository experimentRepository;
    private final MissionService missionService;
    private final PersonService personService;
    private final RoleService roleService;
    private final PlatformService platformService;
    private final ExperimentPersonService experimentPersonService;
    private final ExperimentPublicationService experimentPublicationService;
    private final ExperimentAttachmentService experimentAttachmentService;
    private final ActivityService activityService;
    private final ToaService toaService;
    private final ForCodeService forCodeService;
    private final SeoCodeService seoCodeService;
    private final SubsystemService subsystemService;
    private final AreaService areaService;
    private final TestSubjectTypeService testSubjectTypeService;

    @Autowired
    public ExperimentService(EntityManager entityManager,
                             ExperimentRepository experimentRepository,
                             MissionService missionService, PersonService personService,
                             RoleService roleService,
                             PlatformService platformService,
                             ExperimentPersonService experimentPersonService,
                             ExperimentPublicationService experimentPublicationService,
                             ExperimentAttachmentService experimentAttachmentService,
                             ActivityService activityService, ToaService toaService,
                             ForCodeService forCodeService, SeoCodeService seoCodeService,
                             SubsystemService subsystemService, AreaService areaService,
                             TestSubjectTypeService testSubjectTypeService) {
        this.entityManager = entityManager;
        this.searchSession = Search.session(entityManager);
        this.experimentRepository = experimentRepository;
        this.missionService = missionService;
        this.personService = personService;
        this.roleService = roleService;
        this.platformService = platformService;
        this.experimentPersonService = experimentPersonService;
        this.experimentPublicationService = experimentPublicationService;
        this.experimentAttachmentService = experimentAttachmentService;
        this.activityService = activityService;
        this.toaService = toaService;
        this.forCodeService = forCodeService;
        this.seoCodeService = seoCodeService;
        this.subsystemService = subsystemService;
        this.areaService = areaService;
        this.testSubjectTypeService = testSubjectTypeService;
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
        experiment.setLeadInstitution(experimentRequest.getLeadInstitution());
        Mission mission = missionService.getValidMissionById(experimentRequest.getMissionId());
        Platform platform = mission.getPlatform();
        experiment.setMission(mission);
        experiment.setPlatform(platform);
        experiment.setExperimentObjectives(experimentRequest.getExperimentObjectives());
        experiment.setActivity(activityService.getActivityById(experimentRequest.getActivityId()));

        if (experiment.getActivity().getName().equals(Activities.SCIENTIFIC_RESEARCH.string)) {
            experiment.setToa(toaService.getToaById(experimentRequest.getToaId()));
            experiment.setForCode(forCodeService.getForCodeById(experimentRequest.getForCodeId()));
            experiment.setSeoCode(seoCodeService.getSeoCodeById(experimentRequest.getSeoCodeId()));

            List<ForCode> platformForCodes = platform.getForCodes();
            if (!platformForCodes.contains(experiment.getForCode())) {
                platformForCodes.add(experiment.getForCode());
                platform.setForCodes(platformForCodes);
                platformService.savePlatform(platform);
            }
        } else if (experiment.getActivity().getName().equals(Activities.INDUSTRY.string)) {
            experiment.setSpacecraft(experimentRequest.getSpacecraft());
            Long subsystemId = experimentRequest.getSubsystemId();
            if (subsystemId != null) {
                experiment.setSubsystem(subsystemService.getSubsystemById(subsystemId));
            }
            experiment.setPayload(experimentRequest.getPayload());
        } else if (experiment.getActivity().getName().equals(Activities.HUMAN_SPACEFLIGHT.string)) {
            experiment.setTestSubjectCount(experimentRequest.getTestSubjectCount());
            experiment.setArea(areaService.getAreaById(experimentRequest.getAreaId()));
            experiment.setTestSubjectType(
                    testSubjectTypeService.getTestSubjectTypeById(experimentRequest.getTestSubjectTypeId()));
        }

        experimentRepository.saveAndFlush(experiment);

        SaveExperimentPersonRequest[] personRequests = experimentRequest.getPersonRequests();
        if (personRequests != null && personRequests.length > 0) {
            experiment.setPeople(Arrays.stream(personRequests).map(personRequest -> {
                Person person = personService.getValidPersonById(personRequest.getPersonId());
                Role role = roleService.getRoleById(personRequest.getRoleId());
                return experimentPersonService.addExperimentPerson(experiment, person, role);
            }).toList());
        }

        Publication[] publications = experimentRequest.getPublications();
        if (publications != null && publications.length > 0) {
            experiment.setPublications(Arrays.stream(publications).map(publication -> {
                List<Author> authors = publication.getAuthors();
                if (authors != null && authors.size() > 0)
                    publication.setAuthors(
                            authors.stream().map(experimentPublicationService::saveExperimentPublicationAuthor)
                                   .toList());

                publication.setExperiment(experiment);
                return experimentPublicationService.saveExperimentPublication(publication);
            }).toList());
        }

        List<Attachment> attachments = new ArrayList<>();
        MultipartFile[] experimentAttachmentFiles = experimentRequest.getAttachmentFiles();
        if (experimentAttachmentFiles != null && experimentAttachmentFiles.length > 0) {
            attachments.addAll(Arrays.stream(experimentAttachmentFiles).map(file -> {
                String originalFileName = Objects.requireNonNull(file.getOriginalFilename());
                String fileExtension = FilenameUtils.getExtension(originalFileName);
                if (originalFileName.isBlank() || fileExtension.isBlank())
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

                Attachment attachment = new Attachment();
                attachment.setExperiment(experiment);
                attachment.setMediaType(mediaType);
                attachment.setFilename(finalFileName);
                experimentAttachmentService.save(attachment);
                return attachment;
            }).toList());
        }

        Long[] experimentAttachmentIds = experimentRequest.getAttachmentIds();
        if (experimentAttachmentIds != null && experimentAttachmentIds.length > 0) {
            attachments.addAll(Arrays.stream(experimentRequest.getAttachmentIds())
                                     .map(experimentAttachmentService::findById).toList());
        }
        experiment.setAttachments(attachments);

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
