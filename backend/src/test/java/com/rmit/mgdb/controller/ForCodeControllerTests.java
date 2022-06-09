package com.rmit.mgdb.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.mgdb.model.ForCode;
import com.rmit.mgdb.repository.ForCodeRepository;
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
public class ForCodeControllerTests {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    ForCodeRepository forCodeRepository;

    @BeforeEach
    void setUp() {
        forCodeRepository.deleteAll();
        forCodeRepository.saveAll(new ArrayList<>(Arrays.asList(
                new ForCode("30", "Agricultural, Veterinary And Food Sciences"),
                new ForCode("31", "Biological Sciences"),
                new ForCode("32", "Biomedical And Clinical Sciences"))));
    }

    @Test
    void givenForCodesExist_whenRequested_returnStatusOkAndResponseAsJson() throws Exception {
        mockMvc.perform(get("/api/forCodes"))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void givenForCodesExist_whenRequested_returnForCodesAsJsonArray() throws Exception {
        mockMvc.perform(get("/api/forCodes"))
               .andExpect(jsonPath("$").isArray())
               .andExpect(jsonPath("$").value(hasSize(3)))
               .andExpect(jsonPath("$[0].code").value("30"))
               .andExpect(jsonPath("$[1].code").value("31"))
               .andExpect(jsonPath("$[2].code").value("32"))
               .andExpect(jsonPath("$[0].name").value("Agricultural, Veterinary And Food Sciences"))
               .andExpect(jsonPath("$[1].name").value("Biological Sciences"))
               .andExpect(jsonPath("$[2].name").value("Biomedical And Clinical Sciences"));
    }

    @Test
    void givenForCodesExist_whenRequested_returnForCodesMappableToJavaClass() throws Exception {
        String content = mockMvc.perform(get("/api/forCodes")).andReturn().getResponse().getContentAsString();
        ForCode[] forCodes = objectMapper.readValue(content, ForCode[].class);
        assertEquals(3, forCodes.length);
        assertEquals("30", forCodes[0].getCode());
        assertEquals("31", forCodes[1].getCode());
        assertEquals("32", forCodes[2].getCode());
        assertEquals("Agricultural, Veterinary And Food Sciences", forCodes[0].getName());
        assertEquals("Biological Sciences", forCodes[1].getName());
        assertEquals("Biomedical And Clinical Sciences", forCodes[2].getName());
    }

}
