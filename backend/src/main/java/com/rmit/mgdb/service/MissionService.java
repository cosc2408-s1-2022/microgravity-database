package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.Mission;
import com.rmit.mgdb.payload.AddMissionRequest;
import com.rmit.mgdb.repository.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class MissionService {

    private final MissionRepository missionRepository;
    private final PlatformService platformService;

    @Autowired
    public MissionService(MissionRepository missionRepository, PlatformService platformService) {
        this.missionRepository = missionRepository;
        this.platformService = platformService;
    }

    public List<Mission> getAllMissions() {
        return missionRepository.findAll();
    }

    public Mission getMissionById(Long id) {
        return missionRepository.findById(id)
                                .orElseThrow(() -> new NotFoundException("Mission could not be found.", id));
    }

    public Mission addMission(AddMissionRequest missionRequest) {
        Mission mission = new Mission();
        DateFormat dateFormat = new SimpleDateFormat("yyyy");
        try {
            mission.setLaunchDate(dateFormat.parse(missionRequest.getLaunchDate()));
            mission.setStartDate(dateFormat.parse(missionRequest.getStartDate()));
            mission.setEndDate(dateFormat.parse(missionRequest.getEndDate()));
        } catch (ParseException ignored) {
        }

        mission.setPlatform(platformService.getPlatformById(missionRequest.getPlatformId()));

        return missionRepository.save(mission);
    }

}
