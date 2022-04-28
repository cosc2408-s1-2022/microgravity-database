package com.rmit.mgdb.controller;

import com.rmit.mgdb.payload.MissionPayload;
import com.rmit.mgdb.service.MissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/missions")
public class MissionController {

    private final MissionService missionService;

    @Autowired
    public MissionController(MissionService missionService) {
        this.missionService = missionService;
    }

    @GetMapping
    public List<MissionPayload> getAll() {
        return missionService.getAllMission();
    }

    @GetMapping("/{id}")
    public MissionPayload getById(@PathVariable Long id) {
        return missionService.getById(id);
    }

}
