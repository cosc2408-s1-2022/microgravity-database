package com.rmit.mgdb.service;

import com.rmit.mgdb.model.Experiment;
import com.rmit.mgdb.repository.ExperimentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/*
 * FIXME Delete these comments.
 * Service = Middleman between repositories and controllers containing the actual business logic of the application.
 * https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/stereotype/Service.html
 * TLDR: @Service annotation marks this class as a bean that can be injected as dependency.
 */
@Service
public class ExperimentService {

    private final ExperimentRepository experimentRepository;

    @Autowired
    public ExperimentService(ExperimentRepository experimentRepository) {
        this.experimentRepository = experimentRepository;
    }

    public List<Experiment> getAllExperiments() {
        /*
         * FIXME Delete these comments.
         * Could have additional logic here e.g., filtering the results.
         */
        return experimentRepository.findAll();
    }

}
