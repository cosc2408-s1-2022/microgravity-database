package com.rmit.mgdb.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.mgdb.model.TestSubjectType;
import com.rmit.mgdb.repository.TestSubjectTypeRepository;
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
public class TestSubjectTypeTests {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    TestSubjectTypeRepository testSubjectTypeRepository;

    @BeforeEach
    void setUp() {
        testSubjectTypeRepository.deleteAll();
        testSubjectTypeRepository.saveAll(new ArrayList<>(Arrays.asList(
                new TestSubjectType("Mission Astronaut"),
                new TestSubjectType("Trainee Astronaut"),
                new TestSubjectType("Researchers"))));
    }

    @Test
    void testGetAll1() throws Exception {
        mockMvc.perform(get("/api/testSubjectTypes"))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void testGetAll2() throws Exception {
        mockMvc.perform(get("/api/testSubjectTypes"))
               .andExpect(jsonPath("$").isArray())
               .andExpect(jsonPath("$", hasSize(3)))
               .andExpect(jsonPath("$[0].name").value("Mission Astronaut"))
               .andExpect(jsonPath("$[1].name").value("Trainee Astronaut"))
               .andExpect(jsonPath("$[2].name").value("Researchers"));
    }

    @Test
    void testGetAll3() throws Exception {
        String responseString =
                mockMvc.perform(get("/api/testSubjectTypes")).andReturn().getResponse().getContentAsString();
        TestSubjectType[] response = objectMapper.readValue(responseString, TestSubjectType[].class);
        assertEquals(3, response.length);
        assertEquals("Mission Astronaut", response[0].getName());
        assertEquals("Trainee Astronaut", response[1].getName());
        assertEquals("Researchers", response[2].getName());
    }

}
