package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.Mission;
import com.rmit.mgdb.payload.AddMissionRequest;
import com.rmit.mgdb.payload.MissionPayload;
import com.rmit.mgdb.repository.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoField;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MissionService {

    private final MissionRepository missionRepository;
    private final PlatformService platformService;

    @Autowired
    public MissionService(MissionRepository missionRepository, PlatformService platformService) {
        this.missionRepository = missionRepository;
        this.platformService = platformService;
    }

    public List<MissionPayload> getAllMissions() {
        return missionRepository.findAll().stream().map(MissionPayload::new).collect(Collectors.toList());
    }

    public Mission getMissionById(Long id) {
        return missionRepository.findById(id)
                                .orElseThrow(() -> new NotFoundException("Mission could not be found.", id));
    }

    public MissionPayload getMissionPayloadById(Long id) {
        return new MissionPayload(getMissionById(id));
    }

    public Mission addMission(AddMissionRequest missionRequest) {
        Mission mission = new Mission();
        DateFormat dateFormat = new SimpleDateFormat("yyyy");
        try {
            DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                    .appendPattern("yyyy")
                    .parseDefaulting(ChronoField.MONTH_OF_YEAR, 1)
                    .parseDefaulting(ChronoField.DAY_OF_MONTH, 1)
                    .toFormatter();
            mission.setLaunchDate(LocalDate.parse(missionRequest.getLaunchDate(), formatter));
            mission.setStartDate(LocalDate.parse(missionRequest.getStartDate(), formatter));
            mission.setEndDate(LocalDate.parse(missionRequest.getEndDate(), formatter));
        } catch (DateTimeParseException ignored) {
        }

        mission.setPlatform(platformService.getPlatformById(missionRequest.getPlatformId()));

        return missionRepository.save(mission);
    }

}
