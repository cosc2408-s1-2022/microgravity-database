package com.rmit.mgdb.service;

import com.rmit.mgdb.model.FORs;
import com.rmit.mgdb.repository.FORsRepository;
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
public class FORsService {

    private final FORsRepository fORsRepository;

    @Autowired
    public FORsService(FORsRepository fORsRepository) {
        this.fORsRepository = fORsRepository;
    }

    public List<FORs> getAllFors() {
        /*
         * FIXME Delete these comments.
         * Could have additional logic here e.g., filtering the results.
         */
        return fORsRepository.findAll();
    }

}
