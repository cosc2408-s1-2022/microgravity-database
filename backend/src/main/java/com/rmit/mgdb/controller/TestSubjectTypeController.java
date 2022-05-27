package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.TestSubjectType;
import com.rmit.mgdb.service.TestSubjectTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/testSubjectTypes")
public class TestSubjectTypeController {

    private final TestSubjectTypeService testSubjectTypeService;

    @Autowired
    public TestSubjectTypeController(TestSubjectTypeService testSubjectTypeService) {
        this.testSubjectTypeService = testSubjectTypeService;
    }

    @GetMapping
    public List<TestSubjectType> getAll() {
        return testSubjectTypeService.getAllTestSubjectTypes();
    }

}
