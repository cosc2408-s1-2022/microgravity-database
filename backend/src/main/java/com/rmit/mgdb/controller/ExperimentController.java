package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.Experiment;
import com.rmit.mgdb.payload.AddExperimentRequest;
import com.rmit.mgdb.service.ExperimentService;
import com.rmit.mgdb.service.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/experiments")
public class ExperimentController {

    private final ExperimentService experimentService;
    private final ValidationErrorService validationErrorService;

    @Autowired
    public ExperimentController(ExperimentService experimentService,
                                ValidationErrorService validationErrorService) {
        this.experimentService = experimentService;
        this.validationErrorService = validationErrorService;
    }

    @GetMapping("/get")
    public ResponseEntity<Optional<Experiment>> getById(@RequestParam int id) {
        return new ResponseEntity<>(experimentService.getExperimentById(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@Valid @RequestBody AddExperimentRequest experimentRequest, BindingResult result) {
        ResponseEntity<?> errorMap = validationErrorService.mapValidationErrors(result);
        if (errorMap != null)
            return errorMap;

        return new ResponseEntity<>(experimentService.addExperiment(experimentRequest), HttpStatus.CREATED);
    }

    @GetMapping
    public Page<Experiment> getExperiments(@RequestParam Optional<Integer> page, @RequestParam Optional<Integer> size) {
        return experimentService.getExperiments(page, size);
    }

}
