package com.rmit.mgdb.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.mgdb.model.Role;
import com.rmit.mgdb.repository.RoleRepository;
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
public class RoleControllerTests {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    RoleRepository roleRepository;

    @BeforeEach
    public void setUp() {
        roleRepository.deleteAll();
        roleRepository.saveAll(new ArrayList<>(Arrays.asList(
                new Role("Principal Investigator"),
                new Role("Researcher"),
                new Role("Flight Engineer"))));
    }

    @Test
    void givenRolesExist_whenRequested_returnStatusOkAndResponseAsJson() throws Exception {
        mockMvc.perform(get("/api/roles"))
               .andExpect(status().isOk())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void givenRolesExist_whenRequested_returnRolesAsJsonArray() throws Exception {
        mockMvc.perform(get("/api/roles"))
               .andExpect(jsonPath("$").isArray())
               .andExpect(jsonPath("$").value(hasSize(3)))
               .andExpect(jsonPath("$[0].name").value("Principal Investigator"))
               .andExpect(jsonPath("$[1].name").value("Researcher"))
               .andExpect(jsonPath("$[2].name").value("Flight Engineer"));
    }

    @Test
    void givenRolesExist_whenRequested_returnRolesMappableToJavaClass() throws Exception {
        String content = mockMvc.perform(get("/api/roles")).andReturn().getResponse().getContentAsString();
        Role[] roles = objectMapper.readValue(content, Role[].class);
        assertEquals(3, roles.length);
        assertEquals("Principal Investigator", roles[0].getName());
        assertEquals("Researcher", roles[1].getName());
        assertEquals("Flight Engineer", roles[2].getName());
    }

}
