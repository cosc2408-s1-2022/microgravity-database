package com.rmit.mgdb.service;

import com.rmit.mgdb.model.Mission;
import com.rmit.mgdb.repository.MissionRepository;
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
public class MissionService {

    private final MissionRepository missionRepository;

    @Autowired
    public MissionService(MissionRepository missionRepository) {
        this.missionRepository = missionRepository;
    }

    public List<Mission> getAllMissions() {
        /*
         * FIXME Delete these comments.
         * Could have additional logic here e.g., filtering the results.
         */
        return missionRepository.findAll();
    }

}
