package com.rmit.mgdb.service;

import com.rmit.mgdb.model.Experiment;
import com.rmit.mgdb.repository.ExperimentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperimentService {

    private final ExperimentRepository experimentRepository;

    @Autowired
    public ExperimentService(ExperimentRepository experimentRepository) {
        this.experimentRepository = experimentRepository;
    }

    public List<Experiment> getAllExperiment() {
        return experimentRepository.findAll();
    }

}