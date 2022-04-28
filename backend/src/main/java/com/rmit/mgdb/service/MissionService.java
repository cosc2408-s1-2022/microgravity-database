package com.rmit.mgdb.service;

import com.rmit.mgdb.payload.MissionPayload;
import com.rmit.mgdb.repository.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MissionService {

    private final MissionRepository missionRepository;

    @Autowired
    public MissionService(MissionRepository missionRepository) {
        this.missionRepository = missionRepository;
    }

    public List<MissionPayload> getAllMission() {
        return missionRepository.findAll().stream().map(MissionPayload::new).collect(Collectors.toList());
    }

}
