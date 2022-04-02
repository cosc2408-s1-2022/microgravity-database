package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.People;
import com.rmit.mgdb.service.PeopleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
 * FIXME Delete these comments.
 * RestController = A controller exposing endpoints of the REST API.
 * https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/RestController.html
 * TLDR: @Controller annotation + public methods marked with @{HTTP METHOD}Mapping
 * (optional) @RequestMapping("path prefix for all methods in the controller") e.g., /api/missions/{all+getAll+byId}.
 */
@RestController
@RequestMapping("/api/people")
public class PeopleController {

    private final PeopleService peopleService;

    /*
     * FIXME Delete these comments.
     * @Autowire marks the parameters as injectable dependency.
     * https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Autowired.html
     */
    @Autowired
    public PeopleController(PeopleService peopleService) {
        this.peopleService = peopleService;
    }

    @GetMapping("/all")
    public List<People> getAll() {
        return peopleService.getAllPeople();
    }

}
