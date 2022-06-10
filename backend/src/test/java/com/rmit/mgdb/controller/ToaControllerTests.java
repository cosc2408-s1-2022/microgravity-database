package com.rmit.mgdb.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.mgdb.model.Toa;
import com.rmit.mgdb.repository.ToaRepository;
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
public class ToaControllerTests {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    ToaRepository toaRepository;

    @BeforeEach
    public void setUp() {
        toaRepository.deleteAll();
        toaRepository.saveAll(new ArrayList<>(Arrays.asList(
                new Toa("Pure Basic Research"),
                new Toa("Strategic Basic Research"),
                new Toa("Applied Research"),
                new Toa("Experimental Development"))));
    }

    @Test
    public void givenToasExist_whenRequested_returnStatusOkAndResponseAsJson() throws Exception {
        mockMvc.perform(get("/api/toas"))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void givenToasExist_whenRequested_returnToasAsJsonArray() throws Exception {
        mockMvc.perform(get("/api/toas"))
               .andExpect(jsonPath("$").isArray())
               .andExpect(jsonPath("$", hasSize(4)))
               .andExpect(jsonPath("$[0].name").value("Pure Basic Research"))
               .andExpect(jsonPath("$[1].name").value("Strategic Basic Research"))
               .andExpect(jsonPath("$[2].name").value("Applied Research"))
               .andExpect(jsonPath("$[3].name").value("Experimental Development"));
    }

    @Test
    public void givenToasExist_whenRequested_returnToasMappableToJavaClass() throws Exception {
        String content = mockMvc.perform(get("/api/toas"))
                                .andReturn().getResponse().getContentAsString();
        Toa[] toas = objectMapper.readValue(content, Toa[].class);
        assertEquals(4, toas.length);
        assertEquals("Pure Basic Research", toas[0].getName());
        assertEquals("Strategic Basic Research", toas[1].getName());
        assertEquals("Applied Research", toas[2].getName());
        assertEquals("Experimental Development", toas[3].getName());
    }

}
