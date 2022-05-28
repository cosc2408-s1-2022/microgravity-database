package com.rmit.mgdb.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.mgdb.model.Subsystem;
import com.rmit.mgdb.repository.SubsystemRepository;
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
public class SubsystemControllerTests {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    SubsystemRepository subsystemRepository;

    @BeforeEach
    void setUp() {
        subsystemRepository.deleteAll();
        subsystemRepository.saveAll(new ArrayList<>(Arrays.asList(
                new Subsystem("Power"),
                new Subsystem("Thermal"),
                new Subsystem("Communications"),
                new Subsystem("Data"),
                new Subsystem("Propulsion"),
                new Subsystem("Attitude Determination"),
                new Subsystem("Mechanical"))));
    }

    @Test
    void testGetAll1() throws Exception {
        mockMvc.perform(get("/api/subsystems"))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void testGetAll2() throws Exception {
        mockMvc.perform(get("/api/subsystems"))
               .andExpect(jsonPath("$").isArray())
               .andExpect(jsonPath("$", hasSize(7)))
               .andExpect(jsonPath("$[0].name").value("Power"))
               .andExpect(jsonPath("$[1].name").value("Thermal"))
               .andExpect(jsonPath("$[2].name").value("Communications"))
               .andExpect(jsonPath("$[3].name").value("Data"))
               .andExpect(jsonPath("$[4].name").value("Propulsion"))
               .andExpect(jsonPath("$[5].name").value("Attitude Determination"))
               .andExpect(jsonPath("$[6].name").value("Mechanical"));
    }

    @Test
    void testGetAll3() throws Exception {
        String responseString = mockMvc.perform(get("/api/subsystems")).andReturn().getResponse().getContentAsString();
        Subsystem[] response = objectMapper.readValue(responseString, Subsystem[].class);
        assertEquals(7, response.length);
        assertEquals("Power", response[0].getName());
        assertEquals("Thermal", response[1].getName());
        assertEquals("Communications", response[2].getName());
        assertEquals("Data", response[3].getName());
        assertEquals("Propulsion", response[4].getName());
        assertEquals("Attitude Determination", response[5].getName());
        assertEquals("Mechanical", response[6].getName());
    }

}
