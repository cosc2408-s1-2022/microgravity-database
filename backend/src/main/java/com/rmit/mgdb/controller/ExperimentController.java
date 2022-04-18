package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.Experiment;
import com.rmit.mgdb.payload.AddExperimentRequest;
import com.rmit.mgdb.service.ExperimentService;
import com.rmit.mgdb.service.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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

    @GetMapping("/all")
    public List<Experiment> getAll() {
        return experimentService.getAllExperiment();
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@Valid @RequestBody AddExperimentRequest experimentRequest, BindingResult result) {
        ResponseEntity<?> errorMap = validationErrorService.mapValidationErrors(result);
        if (errorMap != null)
            return errorMap;

        return new ResponseEntity<>(experimentService.addExperiment(experimentRequest), HttpStatus.CREATED);
    }

}
