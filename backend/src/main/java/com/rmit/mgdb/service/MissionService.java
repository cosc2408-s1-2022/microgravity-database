package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.Mission;
import com.rmit.mgdb.payload.AddMissionRequest;
import com.rmit.mgdb.payload.MissionPayload;
import com.rmit.mgdb.payload.ResultsResponse;
import com.rmit.mgdb.repository.MissionRepository;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.rmit.mgdb.util.Constants.DEFAULT_PAGE_SIZE;

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

    public Mission saveMission(AddMissionRequest missionRequest) {
        Mission mission = new Mission();
        Long id = missionRequest.getId();
        if (id != null) {
            Mission existingExperiment = getMissionById(id);
            mission.setId(id);
            mission.setApproved(existingExperiment.isApproved());
            mission.setDeleted(existingExperiment.isDeleted());
            mission.setCreatedAt(existingExperiment.getCreatedAt());
        }
        mission.setName(missionRequest.getName());
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                .appendPattern("yyyy-MM-dd")
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

    public ResultsResponse<Mission> getMissions(Optional<Integer> page, Optional<Integer> size) {
        Page<Mission> missions;
        if (page.isPresent() || size.isPresent()) {
            int pageInt = page.orElse(1) - 1;
            int sizeInt = size.orElse(DEFAULT_PAGE_SIZE);
            missions =
                    missionRepository.findMissionsBy(PageRequest.of(pageInt, sizeInt));
            return new ResultsResponse<>(missions.getTotalElements(), missions.getTotalPages(), pageInt + 1,
                                         sizeInt,
                                         missions.getContent());
        } else {
            missions =
                    missionRepository.findMissionsBy(Pageable.ofSize(DEFAULT_PAGE_SIZE));
            return new ResultsResponse<>(missions.getTotalElements(), missions.getTotalPages(),
                                         missions.getTotalPages() + 1,
                                         DEFAULT_PAGE_SIZE, missions.getContent());
        }
    }

    public void toggleMissionDelete(Long id) {
        Mission mission = getMissionById(id);
        mission.setDeleted(!mission.isDeleted());
        missionRepository.saveAndFlush(mission);
        searchSession.massIndexer().start();
    }

    public void approveMission(Long id) {
        Mission mission = getMissionById(id);
        mission.setApproved(true);
        missionRepository.saveAndFlush(mission);
        searchSession.massIndexer().start();
    }

}
