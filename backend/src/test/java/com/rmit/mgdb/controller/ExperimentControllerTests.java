package com.rmit.mgdb.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.mgdb.model.*;
import com.rmit.mgdb.payload.ResultsResponse;
import com.rmit.mgdb.payload.SaveExperimentRequest;
import com.rmit.mgdb.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

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
public class ExperimentControllerTests {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    ExperimentRepository experimentRepository;
    @Autowired
    MissionRepository missionRepository;
    @Autowired
    PlatformRepository platformRepository;
    @Autowired
    ActivityRepository activityRepository;
    @Autowired
    ToaRepository toaRepository;
    @Autowired
    ForCodeRepository forCodeRepository;
    @Autowired
    SeoCodeRepository seoCodeRepository;
    @Autowired
    SubsystemRepository subsystemRepository;
    @Autowired
    AreaRepository areaRepository;
    @Autowired
    TestSubjectTypeRepository testSubjectTypeRepository;

    @BeforeEach
    void setUp() {
        toaRepository.deleteAll();
        forCodeRepository.deleteAll();
        seoCodeRepository.deleteAll();
        areaRepository.deleteAll();
        subsystemRepository.deleteAll();
        testSubjectTypeRepository.deleteAll();
        activityRepository.deleteAll();
        missionRepository.deleteAll();
        platformRepository.deleteAll();
        experimentRepository.deleteAll();
    }

    Experiment setUpExperiment() {
        Toa toa = new Toa("test");
        toaRepository.save(toa);

        ForCode forCode = new ForCode("1", "test");
        forCodeRepository.save(forCode);

        SeoCode seoCode = new SeoCode("1", "test");
        seoCodeRepository.save(seoCode);

        Area area = new Area("test");
        areaRepository.save(area);

        Subsystem subsystem = new Subsystem("test");
        subsystemRepository.save(subsystem);

        TestSubjectType testSubjectType = new TestSubjectType("test");
        testSubjectTypeRepository.save(testSubjectType);

        Activity activity = new Activity("test");
        activityRepository.save(activity);

        Platform platform = new Platform("test");
        platformRepository.save(platform);

        Mission mission = new Mission();
        mission.setName("test");
        mission.setPlatform(platform);
        missionRepository.save(mission);

        Experiment experiment = new Experiment();
        experiment.setTitle("test");
        experiment.setLeadInstitution("testInstitution");
        experiment.setMission(mission);
        experiment.setPlatform(platform);
        experiment.setExperimentObjectives("testObjectives");
        experiment.setActivity(activity);
        experiment.setToa(toa);
        experiment.setForCode(forCode);
        experiment.setSeoCode(seoCode);
        experiment.setSpacecraft("testSpacecraft");
        experiment.setSubsystem(subsystem);
        experiment.setPayload("testPayload");
        experiment.setTestSubjectCount(1L);
        experiment.setArea(area);
        experiment.setTestSubjectType(testSubjectType);
        return experiment;
    }

    @Test
    void givenExperiment_whenValid_thenSaveExperimentInDatabase() throws Exception {
        Experiment experiment = setUpExperiment();

        mockMvc.perform(post("/api/experiments/save")
                                .param("title", experiment.getTitle())
                                .param("leadInstitution", experiment.getLeadInstitution())
                                .param("missionId", experiment.getMission().getId().toString())
                                .param("experimentObjectives", experiment.getExperimentObjectives())
                                .param("activityId", experiment.getActivity().getId().toString())
                                .param("toaId", experiment.getToa().getId().toString())
                                .param("forCodeId", experiment.getForCode().getId().toString())
                                .param("seoCodeId", experiment.getSeoCode().getId().toString())
                                .param("spacecraft", experiment.getSpacecraft())
                                .param("subsystemId", experiment.getSubsystem().getId().toString())
                                .param("payload", experiment.getPayload())
                                .param("testSubjectCount", experiment.getTestSubjectCount().toString())
                                .param("areaId", experiment.getArea().getId().toString())
                                .param("testSubjectTypeId", experiment.getTestSubjectType().getId().toString()))
               .andExpect(status().isCreated())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void givenExperiment_whenSaved_thenReturnSavedExperiment() throws Exception {
        Experiment experiment = setUpExperiment();

        String content = mockMvc.perform(post("/api/experiments/save")
                                                 .param("title", experiment.getTitle())
                                                 .param("leadInstitution", experiment.getLeadInstitution())
                                                 .param("missionId", experiment.getMission().getId().toString())
                                                 .param("experimentObjectives", experiment.getExperimentObjectives())
                                                 .param("activityId", experiment.getActivity().getId().toString())
                                                 .param("toaId", experiment.getToa().getId().toString())
                                                 .param("forCodeId", experiment.getForCode().getId().toString())
                                                 .param("seoCodeId", experiment.getSeoCode().getId().toString())
                                                 .param("spacecraft", experiment.getSpacecraft())
                                                 .param("subsystemId", experiment.getSubsystem().getId().toString())
                                                 .param("payload", experiment.getPayload())
                                                 .param("testSubjectCount", experiment.getTestSubjectCount().toString())
                                                 .param("areaId", experiment.getArea().getId().toString())
                                                 .param("testSubjectTypeId",
                                                        experiment.getTestSubjectType().getId().toString()))
                                .andReturn().getResponse().getContentAsString();

        Experiment response = objectMapper.readValue(content, Experiment.class);

        assertEquals(experiment.getTitle(), response.getTitle());
        assertEquals(experiment.getLeadInstitution(), response.getLeadInstitution());
        assertEquals(experiment.getMission().getId(), response.getMission().getId());
        assertEquals(experiment.getPlatform().getId(), response.getPlatform().getId());
        assertEquals(experiment.getExperimentObjectives(), response.getExperimentObjectives());
        assertEquals(experiment.getActivity().getId(), response.getActivity().getId());
    }

    @Test
    void givenExperiment_whenInvalid_thenReturnErrors() throws Exception {
        SaveExperimentRequest saveExperimentRequest = new SaveExperimentRequest();
        saveExperimentRequest.setTitle(null);

        String content = mockMvc.perform(post("/api/experiments/save")
                                                 .contentType(MediaType.APPLICATION_JSON)
                                                 .content(objectMapper.writeValueAsString(saveExperimentRequest)))
                                .andExpect(status().isBadRequest())
                                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                                .andReturn().getResponse().getContentAsString();

        Map<String, String> errors = objectMapper.readValue(content, new TypeReference<>() {
        });
        assertTrue(errors.containsKey("title"));
        assertEquals("Experiments must have a title.", errors.get("title"));
        assertTrue(errors.containsKey("leadInstitution"));
        assertEquals("Lead institution must be specified.", errors.get("leadInstitution"));
        assertTrue(errors.containsKey("missionId"));
        assertEquals("Experiments must belong to a mission.", errors.get("missionId"));
        assertTrue(errors.containsKey("activityId"));
        assertEquals("Activity must be specified.", errors.get("activityId"));
    }

    @Test
    void givenExperimentsPresent_whenGivenId_thenReturnExperiment() throws Exception {
        Experiment experiment = setUpExperiment();

        experimentRepository.save(experiment);

        String content = mockMvc.perform(get("/api/experiments/get")
                                                 .param("id", experiment.getId().toString())).andExpect(status().isOk())
                                .andExpect(content().contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse()
                                .getContentAsString();

        Experiment savedExperiment = objectMapper.readValue(content, Experiment.class);
        assertEquals(experiment.getTitle(), savedExperiment.getTitle());
        assertEquals(experiment.getLeadInstitution(), savedExperiment.getLeadInstitution());
        assertEquals(experiment.getMission().getId(), savedExperiment.getMission().getId());
        assertEquals(experiment.getExperimentObjectives(), savedExperiment.getExperimentObjectives());
        assertEquals(experiment.getActivity().getId(), savedExperiment.getActivity().getId());
        assertEquals(experiment.getToa().getId(), savedExperiment.getToa().getId());
        assertEquals(experiment.getForCode().getId(), savedExperiment.getForCode().getId());
        assertEquals(experiment.getSeoCode().getId(), savedExperiment.getSeoCode().getId());
        assertEquals(experiment.getSpacecraft(), savedExperiment.getSpacecraft());
        assertEquals(experiment.getSubsystem().getId(), savedExperiment.getSubsystem().getId());
        assertEquals(experiment.getPayload(), savedExperiment.getPayload());
        assertEquals(experiment.getTestSubjectCount(), savedExperiment.getTestSubjectCount());
        assertEquals(experiment.getArea().getId(), savedExperiment.getArea().getId());
        assertEquals(experiment.getTestSubjectType().getId(), savedExperiment.getTestSubjectType().getId());
    }

    @Test
    void givenExperimentsPresent_whenRequestedWithPagination_thenReturnExperiments() throws Exception {
        Experiment experiment1 = setUpExperiment();
        experiment1.setTitle("test1");
        Experiment experiment2 = setUpExperiment();
        experiment2.setTitle("test2");
        Experiment experiment3 = setUpExperiment();
        experiment3.setTitle("test3");

        experimentRepository.save(experiment1);
        experimentRepository.save(experiment2);
        experimentRepository.save(experiment3);

        String content = mockMvc.perform(get("/api/experiments/paginated")
                                                 .param("page", "1")
                                                 .param("size", "2"))
                                .andExpect(status().isOk())
                                .andExpect(content().contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse()
                                .getContentAsString();

        ResultsResponse<Experiment> experiments = objectMapper.readValue(content, new TypeReference<>() {
        });
        assertEquals(1, experiments.getPage());
        assertEquals(2, experiments.getSize());

        assertEquals(3, experiments.getTotalElements());
        assertEquals(2, experiments.getTotalPages());

        assertEquals(2, experiments.getResults().size());
        assertEquals("test1", experiments.getResults().get(0).getTitle());
        assertEquals("test2", experiments.getResults().get(1).getTitle());
    }

    @Test
    void givenExperiment_whenToggleDelete_thenSetExperimentDeleted() throws Exception {
        Experiment experiment = setUpExperiment();

        experimentRepository.save(experiment);

        mockMvc.perform(post(String.format("/api/experiments/%d/toggleDelete", experiment.getId())))
               .andExpect(status().isOk());

        Experiment updatedExperiment = experimentRepository.findById(experiment.getId()).orElseThrow();

        assertTrue(updatedExperiment.isDeleted());
    }


    @Test
    void givenExperiment_whenApprove_thenSetExperimentApproved() throws Exception {
        Experiment experiment = setUpExperiment();

        experimentRepository.save(experiment);

        mockMvc.perform(post(String.format("/api/experiments/%d/approve", experiment.getId())))
               .andExpect(status().isOk());

        Experiment updatedExperiment = experimentRepository.findById(experiment.getId()).orElseThrow();

        assertTrue(updatedExperiment.isApproved());
    }


}
