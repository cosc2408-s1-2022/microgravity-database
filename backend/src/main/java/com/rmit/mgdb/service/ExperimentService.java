package com.rmit.mgdb.service;

import com.rmit.mgdb.model.Experiment;
import com.rmit.mgdb.model.Person;
import com.rmit.mgdb.model.Role;
import com.rmit.mgdb.payload.AddExperimentPersonRequest;
import com.rmit.mgdb.payload.AddExperimentRequest;
import com.rmit.mgdb.repository.ExperimentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ExperimentService {

    private final ExperimentRepository experimentRepository;
    private final MissionService missionService;
    private final PlatformService platformService;
    private final ForCodeService forCodeService;
    private final SeoCodeService seoCodeService;
    private final PersonService personService;
    private final RoleService roleService;
    private final ExperimentPersonService experimentPersonService;

    @Autowired
    public ExperimentService(ExperimentRepository experimentRepository,
                             MissionService missionService, PlatformService platformService,
                             ForCodeService forCodeService, SeoCodeService seoCodeService,
                             PersonService personService, RoleService roleService,
                             ExperimentPersonService experimentPersonService) {
        this.experimentRepository = experimentRepository;
        this.missionService = missionService;
        this.platformService = platformService;
        this.forCodeService = forCodeService;
        this.seoCodeService = seoCodeService;
        this.personService = personService;
        this.roleService = roleService;
        this.experimentPersonService = experimentPersonService;
    }

    public List<Experiment> getAllExperiment() {
        return experimentRepository.findAll();
    }

    public Experiment addExperiment(AddExperimentRequest experimentRequest) {
        Experiment experiment = new Experiment();
        experiment.setTitle(experimentRequest.getTitle());
        experiment.setToa(experimentRequest.getToa());
        experiment.setLeadInstitution(experimentRequest.getLeadInstitution());
        experiment.setExperimentAim(experimentRequest.getExperimentAim());
        experiment.setExperimentObjective(experimentRequest.getExperimentObjective());
        experiment.setExperimentModuleDrawing(experimentRequest.getExperimentModuleDrawing());
        experiment.setExperimentPublications(experimentRequest.getExperimentPublications());
        experiment.setMission(missionService.getMissionById(experimentRequest.getMissionId()));
        experiment.setPlatform(platformService.getPlatformById(experimentRequest.getPlatformId()));
        experiment.setForCode(forCodeService.getForCodeById(experimentRequest.getForCodeId()));
        experiment.setSeoCode(seoCodeService.getSeoCodeById(experimentRequest.getSeoCodeId()));
        experimentRepository.save(experiment);

        AddExperimentPersonRequest[] personRequests = experimentRequest.getExperimentPersonRequests();
        if (personRequests != null && personRequests.length > 0) {
            experiment.setPeople(Arrays.stream(personRequests).map(personRequest -> {
                Person person = personService.getPersonById(personRequest.getPersonId());
                Role role = roleService.getRoleById(personRequest.getRoleId());
                return experimentPersonService.addExperimentPerson(experiment, person, role);
            }).toList());
        }

        return experiment;
    }

}
