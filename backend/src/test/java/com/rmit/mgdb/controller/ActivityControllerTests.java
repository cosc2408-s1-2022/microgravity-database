package com.rmit.mgdb.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.mgdb.model.Activity;
import com.rmit.mgdb.repository.ActivityRepository;
import com.rmit.mgdb.service.ActivityService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@AutoConfigureMockMvc
@SpringBootTest
class ActivityControllerTests {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    ActivityService activityService;
    @Autowired
    ActivityRepository activityRepository;

    @BeforeEach
    void setUp() {
        activityRepository.deleteAll();
        activityRepository.saveAll(new ArrayList<>(Arrays.asList(
                new Activity(1L, "Scientific Research"),
                new Activity(2L, "Industry"),
                new Activity(3L, "Human Spaceflight"))));
    }

    @Test
    void getAll() throws Exception {
        String responseString = mockMvc.perform(get("/api/activities")).andReturn().getResponse().getContentAsString();
        Activity[] response = objectMapper.readValue(responseString, Activity[].class);
        assertEquals(3, response.length);
    }

}
