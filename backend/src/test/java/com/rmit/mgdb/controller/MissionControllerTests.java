package com.rmit.mgdb.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.mgdb.model.Mission;
import com.rmit.mgdb.model.Platform;
import com.rmit.mgdb.payload.ResultsResponse;
import com.rmit.mgdb.payload.SaveMissionRequest;
import com.rmit.mgdb.repository.MissionRepository;
import com.rmit.mgdb.repository.PlatformRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class MissionControllerTests {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    MissionRepository missionRepository;
    @Autowired
    PlatformRepository platformRepository;

    Mission setUpMission() {
        Platform platform = new Platform("test");
        platformRepository.save(platform);

        Mission mission = new Mission();
        mission.setName("test");
        mission.setLaunchDate(LocalDate.now());
        mission.setPlatform(platform);
        return mission;
    }

    @BeforeEach
    void setUp() {
        missionRepository.deleteAll();
        platformRepository.deleteAll();
    }

    @Test
    void givenMission_whenValid_thenSaveMissionInDatabase() throws Exception {
        Mission mission = setUpMission();
        SaveMissionRequest saveMissionRequest = new SaveMissionRequest();
        saveMissionRequest.setName(mission.getName());
        saveMissionRequest.setLaunchDate(mission.getLaunchDate().toString());
        saveMissionRequest.setPlatformId(mission.getPlatform().getId());

        mockMvc.perform(post("/api/missions/save")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(saveMissionRequest)))
               .andExpect(status().isCreated())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void givenMission_whenSaved_thenReturnSavedMission() throws Exception {
        Mission mission = setUpMission();
        SaveMissionRequest saveMissionRequest = new SaveMissionRequest();
        saveMissionRequest.setName(mission.getName());
        saveMissionRequest.setLaunchDate(mission.getLaunchDate().toString());
        saveMissionRequest.setPlatformId(mission.getPlatform().getId());

        String content = mockMvc.perform(post("/api/missions/save")
                                                 .contentType(MediaType.APPLICATION_JSON)
                                                 .content(objectMapper.writeValueAsString(saveMissionRequest)))
                                .andReturn().getResponse().getContentAsString();

        Mission savedMission = objectMapper.readValue(content, Mission.class);

        assertEquals(mission.getName(), savedMission.getName());
        assertEquals(mission.getLaunchDate(), savedMission.getLaunchDate());
        assertEquals(mission.getPlatform().getId(), savedMission.getPlatform().getId());
    }

    @Test
    void givenMission_whenInvalid_thenReturnErrors() throws Exception {
        Mission mission = setUpMission();
        SaveMissionRequest saveMissionRequest = new SaveMissionRequest();
        saveMissionRequest.setName(null);
        saveMissionRequest.setLaunchDate(mission.getLaunchDate().toString());
        saveMissionRequest.setPlatformId(null);

        String content = mockMvc.perform(post("/api/missions/save")
                                                 .contentType(MediaType.APPLICATION_JSON)
                                                 .content(objectMapper.writeValueAsString(saveMissionRequest)))
                                .andExpect(status().isBadRequest())
                                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                                .andReturn().getResponse().getContentAsString();

        Map<String, String> errors = objectMapper.readValue(content, new TypeReference<>() {
        });
        assertTrue(errors.containsKey("name"));
        assertEquals("Name must not be blank.", errors.get("name"));
        assertTrue(errors.containsKey("platformId"));
        assertEquals("Mission must be on a platform.", errors.get("platformId"));
    }

    @Test
    void givenMissionsPresent_whenRequested_thenReturnMissions() throws Exception {
        Mission mission1 = setUpMission();
        mission1.setName("test1");
        Mission mission2 = setUpMission();
        mission2.setName("test2");
        Mission mission3 = setUpMission();
        mission3.setName("test3");

        missionRepository.save(mission1);
        missionRepository.save(mission2);
        missionRepository.save(mission3);

        String content = mockMvc.perform(get("/api/missions")).andExpect(status().isOk())
                                .andExpect(content().contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse()
                                .getContentAsString();

        List<Mission> missions = objectMapper.readValue(content, new TypeReference<>() {
        });
        assertEquals(3, missions.size());
        assertEquals("test1", missions.get(0).getName());
        assertEquals("test2", missions.get(1).getName());
        assertEquals("test3", missions.get(2).getName());
    }

    @Test
    void givenMissionsPresent_whenRequestedWithPagination_thenReturnMissions() throws Exception {
        Mission mission1 = setUpMission();
        mission1.setName("test1");
        Mission mission2 = setUpMission();
        mission2.setName("test2");
        Mission mission3 = setUpMission();
        mission3.setName("test3");

        missionRepository.save(mission1);
        missionRepository.save(mission2);
        missionRepository.save(mission3);

        String content = mockMvc.perform(get("/api/missions/paginated")
                                                 .param("page", "1")
                                                 .param("size", "2"))
                                .andExpect(status().isOk())
                                .andExpect(content().contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse()
                                .getContentAsString();

        ResultsResponse<Mission> missions = objectMapper.readValue(content, new TypeReference<>() {
        });
        assertEquals(1, missions.getPage());
        assertEquals(2, missions.getSize());

        assertEquals(3, missions.getTotalElements());
        assertEquals(2, missions.getTotalPages());

        assertEquals(2, missions.getResults().size());
        assertEquals("test1", missions.getResults().get(0).getName());
        assertEquals("test2", missions.getResults().get(1).getName());
    }

    @Test
    void givenMission_whenToggleDelete_thenSetMissionDeleted() throws Exception {
        Mission mission = setUpMission();

        missionRepository.save(mission);

        mockMvc.perform(post(String.format("/api/missions/%d/toggleDelete", mission.getId())))
               .andExpect(status().isOk());

        Mission updatedMission = missionRepository.findById(mission.getId()).orElseThrow();

        assertTrue(updatedMission.isDeleted());
    }


    @Test
    void givenMission_whenApprove_thenSetMissionApproved() throws Exception {
        Mission mission = setUpMission();

        missionRepository.save(mission);

        mockMvc.perform(post(String.format("/api/missions/%d/approve", mission.getId())))
               .andExpect(status().isOk());

        Mission updatedMission = missionRepository.findById(mission.getId()).orElseThrow();

        assertTrue(updatedMission.isApproved());
    }


}
