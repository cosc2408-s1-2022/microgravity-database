package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.Experiment;
import com.rmit.mgdb.service.ExperimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/experiments")
public class ExperimentController {

    private final ExperimentService experimentService;

    @Autowired
    public ExperimentController(ExperimentService experimentService) {
        this.experimentService = experimentService;
    }

    @GetMapping("/all")
    public List<Experiment> getAll() {
        return experimentService.getAllExperiment();
    }

    @GetMapping("/get")
    public ResponseEntity<Optional<Experiment>> getById(@RequestParam int id) {
        return new ResponseEntity<>(experimentService.getExperimentById(id), HttpStatus.OK);
    }

}
