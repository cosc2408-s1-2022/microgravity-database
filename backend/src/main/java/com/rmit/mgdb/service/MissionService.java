package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.Mission;
import com.rmit.mgdb.payload.AddMissionRequest;
import com.rmit.mgdb.payload.MissionPayload;
import com.rmit.mgdb.repository.MissionRepository;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoField;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MissionService {

    @PersistenceContext
    private final EntityManager entityManager;
    private final SearchSession searchSession;

    private final MissionRepository missionRepository;
    private final PlatformService platformService;

    @Autowired
    public MissionService(EntityManager entityManager, MissionRepository missionRepository,
                          PlatformService platformService) {
        this.entityManager = entityManager;
        this.missionRepository = missionRepository;
        this.searchSession = Search.session(entityManager);
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
        mission.setName(missionRequest.getName());
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                .appendPattern("yyyy")
                .parseDefaulting(ChronoField.MONTH_OF_YEAR, 1)
                .parseDefaulting(ChronoField.DAY_OF_MONTH, 1)
                .toFormatter();
        mission.setLaunchDate(LocalDate.parse(missionRequest.getLaunchDate(), formatter));
        String startDate = missionRequest.getStartDate();
        String endDate = missionRequest.getEndDate();
        if (startDate != null) {
            mission.setStartDate(LocalDate.parse(startDate, formatter));
        }
        if (endDate != null) {
            mission.setEndDate(LocalDate.parse(endDate, formatter));
        }
        mission.setPlatform(platformService.getPlatformById(missionRequest.getPlatformId()));
        mission = missionRepository.saveAndFlush(mission);

        searchSession.massIndexer().start();
        return mission;
    }

}
