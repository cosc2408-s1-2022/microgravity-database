package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.ExperimentPersonAlreadyExistsException;
import com.rmit.mgdb.model.*;
import com.rmit.mgdb.repository.ExperimentPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ExperimentPersonService {

    private final ExperimentPersonRepository experimentPersonRepository;

    @Autowired
    public ExperimentPersonService(ExperimentPersonRepository experimentPersonRepository) {
        this.experimentPersonRepository = experimentPersonRepository;
    }

    public ExperimentPerson addExperimentPerson(Experiment experiment, Person person, Role role) {
        ExperimentPersonKey experimentPersonKey = new ExperimentPersonKey();
        experimentPersonKey.setExperimentId(experiment.getId());
        experimentPersonKey.setPersonId(person.getId());
        if (experimentPersonRepository.existsById(experimentPersonKey)) {
            throw new ExperimentPersonAlreadyExistsException("Person with role already exists on experiment.",
                                                             experiment.getId(),
                                                             person.getId(),
                                                             role.getId());
        }

        ExperimentPerson experimentPerson = new ExperimentPerson();
        experimentPerson.setId(experimentPersonKey);
        experimentPerson.setExperiment(experiment);
        experimentPerson.setPerson(person);
        experimentPerson.setRole(role);

        return experimentPersonRepository.save(experimentPerson);
    }

    @Transactional
    public void removeAllExperimentPeople(Long id) {
        experimentPersonRepository.deleteAllByExperiment_Id(id);
    }

}
