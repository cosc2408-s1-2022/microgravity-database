package com.rmit.mgdb.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.mgdb.model.Person;
import com.rmit.mgdb.model.User;
import com.rmit.mgdb.model.User.UserRole;
import com.rmit.mgdb.payload.AuthenticationRequest;
import com.rmit.mgdb.payload.AuthenticationResponse;
import com.rmit.mgdb.payload.RegisterPayload;
import com.rmit.mgdb.repository.PersonRepository;
import com.rmit.mgdb.repository.UserRepository;
import com.rmit.mgdb.security.JWTTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class UserControllerTests {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PersonRepository personRepository;
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    JWTTokenProvider jwtTokenProvider;

    User setUpUser() {
        User user = new User();
        user.setUsername("test@test");
        user.setPassword("password");
        user.setRole(UserRole.USER.string);
        return user;
    }

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
        userRepository.deleteAll();
        personRepository.deleteAll();
    }

    @Test
    void givenCredentials_whenRegistered_thenReturnValidResponse() throws Exception {
        User user = setUpUser();

        mockMvc.perform(post("/api/users/register/basic")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(user)))
               .andExpect(status().isCreated())
               .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void givenCredentials_whenRegistered_thenReturnUser() throws Exception {
        User user = setUpUser();

        String content = mockMvc.perform(post("/api/users/register/basic")
                                                 .contentType(MediaType.APPLICATION_JSON)
                                                 .content(objectMapper.writeValueAsString(user)))
                                .andReturn().getResponse().getContentAsString();

        AuthenticationResponse response = objectMapper.readValue(content, AuthenticationResponse.class);
        assertEquals(user.getUsername(), response.getUser().getUsername());
    }

    @Test
    void givenCredentials_whenRegistered_thenSaveUserInDatabase() throws Exception {
        User user = setUpUser();

        String content = mockMvc.perform(post("/api/users/register/basic")
                                                 .contentType(MediaType.APPLICATION_JSON)
                                                 .content(objectMapper.writeValueAsString(user)))
                                .andReturn().getResponse().getContentAsString();

        AuthenticationResponse response = objectMapper.readValue(content, AuthenticationResponse.class);
        Optional<User> repositoryUser = userRepository.findByUsername(user.getUsername());

        assertTrue(repositoryUser.isPresent());
        assertEquals(response.getUser().getUsername(), repositoryUser.get().getUsername());
    }

    @Test
    void givenCredentials_whenRegisteredAsResearcher_thenSaveUserAndPersonInDatabase() throws Exception {
        User user = setUpUser();
        Person person = setUpPerson();
        RegisterPayload registerPayload = new RegisterPayload();
        registerPayload.setUser(user);
        registerPayload.setPerson(person);

        String content = mockMvc.perform(post("/api/users/register")
                                                 .contentType(MediaType.APPLICATION_JSON)
                                                 .content(objectMapper.writeValueAsString(registerPayload)))
                                .andReturn().getResponse().getContentAsString();

        AuthenticationResponse response = objectMapper.readValue(content, AuthenticationResponse.class);
        Optional<User> repositoryUser = userRepository.findByUsername(user.getUsername());
        Optional<Person> repositoryPerson = personRepository.findAll().stream().findFirst();

        assertTrue(repositoryUser.isPresent());
        assertEquals(response.getUser().getUsername(), repositoryUser.get().getUsername());

        assertTrue(repositoryPerson.isPresent());
        assertEquals(repositoryPerson.get().getFirstName(), person.getFirstName());
        assertEquals(repositoryPerson.get().getFamilyName(), person.getFamilyName());
        assertEquals(repositoryPerson.get().getAffiliation(), person.getAffiliation());
        assertEquals(repositoryPerson.get().getCity(), person.getCity());
        assertEquals(repositoryPerson.get().getState(), person.getState());
        assertEquals(repositoryPerson.get().getCountry(), person.getCountry());
        assertEquals(repositoryPerson.get().getEmail(), person.getEmail());
        assertEquals(repositoryPerson.get().getPhone(), person.getPhone());
    }

    @Test
    void givenCredentials_whenAuthenticated_thenReturnValidResponse() throws Exception {
        User user = setUpUser();
        AuthenticationRequest request = new AuthenticationRequest();
        request.setUsername(user.getUsername());
        request.setPassword(user.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        mockMvc.perform(post("/api/users/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
               .andExpect(status().isOk());
    }

    @Test
    void givenCredentials_whenUsernameIncorrect_thenReturnUnauthorised() throws Exception {
        User user = setUpUser();
        AuthenticationRequest request = new AuthenticationRequest();
        request.setUsername("incorrect");
        request.setPassword(user.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);


        mockMvc.perform(post("/api/users/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
               .andExpect(status().isUnauthorized());
    }

    @Test
    void givenCredentials_whenPasswordIncorrect_thenReturnUnauthorised() throws Exception {
        User user = setUpUser();
        AuthenticationRequest request = new AuthenticationRequest();
        request.setUsername(user.getUsername());
        request.setPassword("incorrect");
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);


        mockMvc.perform(post("/api/users/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
               .andExpect(status().isUnauthorized());
    }

    @Test
    void givenCredentials_whenAuthenticated_thenReturnJWTToken() throws Exception {
        User user = setUpUser();
        AuthenticationRequest request = new AuthenticationRequest();
        request.setUsername(user.getUsername());
        request.setPassword(user.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);


        String content = mockMvc.perform(post("/api/users/login")
                                                 .contentType(MediaType.APPLICATION_JSON)
                                                 .content(objectMapper.writeValueAsString(request)))
                                .andReturn().getResponse().getContentAsString();

        AuthenticationResponse response = objectMapper.readValue(content, AuthenticationResponse.class);
        assertFalse(response.getJwt().isEmpty());
        assertEquals(user.getUsername(), jwtTokenProvider.extractUsername(response.getJwt()));
        assertTrue(jwtTokenProvider.extractExpiration(response.getJwt()).after(Date.from(Instant.now())));
    }

}

