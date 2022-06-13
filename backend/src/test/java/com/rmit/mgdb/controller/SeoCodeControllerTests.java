package com.rmit.mgdb.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.mgdb.model.SeoCode;
import com.rmit.mgdb.repository.SeoCodeRepository;
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
public class SeoCodeControllerTests {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    SeoCodeRepository seoCodeRepository;

    @BeforeEach
    void setUp() {
        seoCodeRepository.deleteAll();
        seoCodeRepository.saveAll(new ArrayList<>(Arrays.asList(
                new SeoCode("10", "Animal Production And Animal Primary Products"),
                new SeoCode("11", "Commercial Services And Tourism"),
                new SeoCode("12", "Construction")
                                                               )));
    }

    @Test
    void givenSeoCodesExist_whenRequested_returnStatusOkAndResponseAsJson() throws Exception {
        mockMvc.perform(get("/api/seoCodes"))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void givenSeoCodesExist_whenRequested_returnSeoCodesAsJsonArray() throws Exception {
        mockMvc.perform(get("/api/seoCodes"))
               .andExpect(jsonPath("$").isArray())
               .andExpect(jsonPath("$").value(hasSize(3)))
               .andExpect(jsonPath("$[0].code").value("10"))
               .andExpect(jsonPath("$[1].code").value("11"))
               .andExpect(jsonPath("$[2].code").value("12"))
               .andExpect(jsonPath("$[0].name").value("Animal Production And Animal Primary Products"))
               .andExpect(jsonPath("$[1].name").value("Commercial Services And Tourism"))
               .andExpect(jsonPath("$[2].name").value("Construction"));
    }

    @Test
    void givenSeoCodesExist_whenRequested_returnSeoCodesMappableToJavaClass() throws Exception {
        String content = mockMvc.perform(get("/api/seoCodes")).andReturn().getResponse().getContentAsString();
        SeoCode[] seoCodes = objectMapper.readValue(content, SeoCode[].class);
        assertEquals(3, seoCodes.length);
        assertEquals("10", seoCodes[0].getCode());
        assertEquals("11", seoCodes[1].getCode());
        assertEquals("12", seoCodes[2].getCode());
        assertEquals("Animal Production And Animal Primary Products", seoCodes[0].getName());
        assertEquals("Commercial Services And Tourism", seoCodes[1].getName());
        assertEquals("Construction", seoCodes[2].getName());
    }

}
