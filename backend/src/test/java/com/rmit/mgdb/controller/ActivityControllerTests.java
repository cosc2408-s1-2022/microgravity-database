package com.rmit.mgdb.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.mgdb.model.Activity;
import com.rmit.mgdb.repository.ActivityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ActivityControllerTests {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    ActivityRepository activityRepository;

    @BeforeEach
    void setUp() {
        activityRepository.deleteAll();
        activityRepository.saveAll(new ArrayList<>(Arrays.asList(
                new Activity("Scientific Research"),
                new Activity("Industry"),
                new Activity("Human Spaceflight"))));
    }

    @Test
    void givenActivitiesExist_whenRequested_returnStatusOkAndResponseAsJson() throws Exception {
        mockMvc.perform(get("/api/activities"))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void givenActivitiesExist_whenRequested_returnActivitiesAsJsonArray() throws Exception {
        mockMvc.perform(get("/api/activities"))
               .andExpect(jsonPath("$").isArray())
               .andExpect(jsonPath("$").value(hasSize(3)))
               .andExpect(jsonPath("$[0].name").value("Scientific Research"))
               .andExpect(jsonPath("$[1].name").value("Industry"))
               .andExpect(jsonPath("$[2].name").value("Human Spaceflight"));
    }

    @Test
    void givenActivitiesExist_whenRequested_returnActivitiesMappableToJavaClass() throws Exception {
        String responseString = mockMvc.perform(get("/api/activities")).andReturn().getResponse().getContentAsString();
        Activity[] response = objectMapper.readValue(responseString, Activity[].class);
        assertEquals(3, response.length);
    }

}
