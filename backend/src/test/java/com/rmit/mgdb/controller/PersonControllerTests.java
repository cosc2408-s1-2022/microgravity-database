package com.rmit.mgdb.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.mgdb.model.Person;
import com.rmit.mgdb.payload.ResultsResponse;
import com.rmit.mgdb.repository.PersonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class PersonControllerTests {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    PersonRepository personRepository;

    Person setUpPerson() {
        Person person = new Person();
        person.setFirstName("testFirstName");
        person.setFamilyName("testLastName");
        person.setAffiliation("testAffiliation");
        person.setCity("testCity");
        person.setState("testState");
        person.setCountry("testCountry");
        person.setEmail("test@email");
        person.setPhone("testPhone");
        return person;
    }

    @BeforeEach
    void setUp() {
        personRepository.deleteAll();
    }

    @Test
    void givenPerson_whenValid_thenSavePersonInDatabase() throws Exception {
        Person person = setUpPerson();
        mockMvc.perform(post("/api/people/save")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(person)))
               .andExpect(status().isCreated())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void givenPerson_whenSaved_thenReturnSavedPerson() throws Exception {
        Person person = setUpPerson();
        String content = mockMvc.perform(post("/api/people/save")
                                                 .contentType(MediaType.APPLICATION_JSON)
                                                 .content(objectMapper.writeValueAsString(person)))
                                .andReturn().getResponse().getContentAsString();

        Person savedPerson = objectMapper.readValue(content, Person.class);

        assertEquals(person.getFirstName(), savedPerson.getFirstName());
        assertEquals(person.getFamilyName(), savedPerson.getFamilyName());
        assertEquals(person.getAffiliation(), savedPerson.getAffiliation());
        assertEquals(person.getCity(), savedPerson.getCity());
        assertEquals(person.getState(), savedPerson.getState());
        assertEquals(person.getCountry(), savedPerson.getCountry());
        assertEquals(person.getEmail(), savedPerson.getEmail());
        assertEquals(person.getPhone(), savedPerson.getPhone());
    }

    @Test
    void givenPerson_whenInvalid_thenReturnErrors() throws Exception {
        Person person = setUpPerson();
        person.setFirstName(null);
        person.setEmail("invalidEmail");

        String content = mockMvc.perform(post("/api/people/save")
                                                 .contentType(MediaType.APPLICATION_JSON)
                                                 .content(objectMapper.writeValueAsString(person)))
                                .andExpect(status().isBadRequest())
                                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                                .andReturn().getResponse().getContentAsString();

        Map<String, String> errors = objectMapper.readValue(content, new TypeReference<>() {
        });
        assertTrue(errors.containsKey("firstName"));
        assertEquals("First name cannot be blank.", errors.get("firstName"));
        assertTrue(errors.containsKey("email"));
        assertEquals("Not a valid email address.", errors.get("email"));
    }

    @Test
    void givenPeoplePresent_whenRequested_thenReturnPeople() throws Exception {
        Person person1 = setUpPerson();
        person1.setFirstName("testFirstName1");
        Person person2 = setUpPerson();
        person2.setFirstName("testFirstName2");
        Person person3 = setUpPerson();
        person3.setFirstName("testFirstName3");

        personRepository.save(person1);
        personRepository.save(person2);
        personRepository.save(person3);

        String content = mockMvc.perform(get("/api/people")).andExpect(status().isOk())
                                .andExpect(content().contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse()
                                .getContentAsString();

        List<Person> people = objectMapper.readValue(content, new TypeReference<>() {
        });
        assertEquals(3, people.size());
        assertEquals("testFirstName1", people.get(0).getFirstName());
        assertEquals("testFirstName2", people.get(1).getFirstName());
        assertEquals("testFirstName3", people.get(2).getFirstName());
    }

    @Test
    void givenPeoplePresent_whenRequestedWithPagination_thenReturnPeople() throws Exception {
        Person person1 = setUpPerson();
        person1.setFirstName("testFirstName1");
        Person person2 = setUpPerson();
        person2.setFirstName("testFirstName2");
        Person person3 = setUpPerson();
        person3.setFirstName("testFirstName3");

        personRepository.save(person1);
        personRepository.save(person2);
        personRepository.save(person3);

        String content = mockMvc.perform(get("/api/people/paginated")
                                                 .param("page", "1")
                                                 .param("size", "2"))
                                .andExpect(status().isOk())
                                .andExpect(content().contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse()
                                .getContentAsString();

        ResultsResponse<Person> people = objectMapper.readValue(content, new TypeReference<>() {
        });
        assertEquals(1, people.getPage());
        assertEquals(2, people.getSize());

        assertEquals(3, people.getTotalElements());
        assertEquals(2, people.getTotalPages());

        assertEquals(2, people.getResults().size());
        assertEquals("testFirstName1", people.getResults().get(0).getFirstName());
        assertEquals("testFirstName2", people.getResults().get(1).getFirstName());
    }

    @Test
    void givenPerson_whenToggleDelete_thenSetPersonDeleted() throws Exception {
        Person person = setUpPerson();

        personRepository.save(person);

        mockMvc.perform(post(String.format("/api/people/%d/toggleDelete", person.getId())))
               .andExpect(status().isOk());

        Person updatedPerson = personRepository.findById(person.getId()).orElseThrow();

        assertTrue(updatedPerson.isDeleted());
    }


    @Test
    void givenPerson_whenApprove_thenSetPersonApproved() throws Exception {
        Person person = setUpPerson();

        personRepository.save(person);

        mockMvc.perform(post(String.format("/api/people/%d/approve", person.getId())))
               .andExpect(status().isOk());

        Person updatedPerson = personRepository.findById(person.getId()).orElseThrow();

        assertTrue(updatedPerson.isApproved());
    }

}
