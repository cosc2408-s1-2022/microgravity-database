package com.rmit.mgdb.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.mgdb.model.Area;
import com.rmit.mgdb.repository.AreaRepository;
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
class AreaControllerTests {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    AreaRepository areaRepository;

    @BeforeEach
    void setUp() {
        areaRepository.deleteAll();
        areaRepository.saveAll(new ArrayList<>(Arrays.asList(
                new Area("Food Science"),
                new Area("Physiology"),
                new Area("Space Medicine"),
                new Area("Wearables"),
                new Area("Space Suits"))));
    }

    @Test
    void givenAreasExist_whenRequested_returnStatusOkAndResponseAsJson() throws Exception {
        mockMvc.perform(get("/api/areas"))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void givenAreasExist_whenRequested_returnAreasAsJsonArray() throws Exception {
        mockMvc.perform(get("/api/areas"))
               .andExpect(jsonPath("$").isArray())
               .andExpect(jsonPath("$", hasSize(5)))
               .andExpect(jsonPath("$[0].name").value("Food Science"))
               .andExpect(jsonPath("$[1].name").value("Physiology"))
               .andExpect(jsonPath("$[2].name").value("Space Medicine"))
               .andExpect(jsonPath("$[3].name").value("Wearables"))
               .andExpect(jsonPath("$[4].name").value("Space Suits"));
    }

    @Test
    void givenAreasExist_whenRequested_returnAreasMappableToJavaClass() throws Exception {
        String responseString = mockMvc.perform(get("/api/areas")).andReturn().getResponse().getContentAsString();
        Area[] response = objectMapper.readValue(responseString, Area[].class);
        assertEquals(5, response.length);
        assertEquals("Food Science", response[0].getName());
        assertEquals("Physiology", response[1].getName());
        assertEquals("Space Medicine", response[2].getName());
        assertEquals("Wearables", response[3].getName());
        assertEquals("Space Suits", response[4].getName());
    }

}
