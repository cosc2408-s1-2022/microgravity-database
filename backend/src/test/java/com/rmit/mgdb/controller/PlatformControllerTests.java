package com.rmit.mgdb.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.mgdb.model.Platform;
import com.rmit.mgdb.repository.PlatformRepository;
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
public class PlatformControllerTests {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    PlatformRepository platformRepository;

    @BeforeEach
    public void setUp() {
        platformRepository.deleteAll();
        platformRepository.saveAll(new ArrayList<>(Arrays.asList(
                new Platform("spaceStation"),
                new Platform("spaceShuttle"),
                new Platform("retrievableCapsule"),
                new Platform("soundingRocket"),
                new Platform("parabolicFlight"),
                new Platform("groundBasedFacility"))));
    }

    @Test
    void testGetAll1() throws Exception {
        mockMvc.perform(get("/api/platforms"))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void testGetAll2() throws Exception {
        mockMvc.perform(get("/api/platforms"))
               .andExpect(jsonPath("$").isArray())
               .andExpect(jsonPath("$").value(hasSize(6)))
               .andExpect(jsonPath("$[0].name").value("spaceStation"))
               .andExpect(jsonPath("$[1].name").value("spaceShuttle"))
               .andExpect(jsonPath("$[2].name").value("retrievableCapsule"))
               .andExpect(jsonPath("$[3].name").value("soundingRocket"))
               .andExpect(jsonPath("$[4].name").value("parabolicFlight"))
               .andExpect(jsonPath("$[5].name").value("groundBasedFacility"));
    }

    @Test
    void testGetAll3() throws Exception {
        String content = mockMvc.perform(get("/api/platforms")).andReturn().getResponse().getContentAsString();
        Platform[] platforms = objectMapper.readValue(content, Platform[].class);
        assertEquals(platforms.length, 6);
        assertEquals(platforms[0].getName(), "spaceStation");
        assertEquals(platforms[1].getName(), "spaceShuttle");
        assertEquals(platforms[2].getName(), "retrievableCapsule");
        assertEquals(platforms[3].getName(), "soundingRocket");
        assertEquals(platforms[4].getName(), "parabolicFlight");
        assertEquals(platforms[5].getName(), "groundBasedFacility");
    }

}
