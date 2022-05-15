package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.Experiment;
import com.rmit.mgdb.payload.ResultsResponse;
import com.rmit.mgdb.payload.SaveExperimentRequest;
import com.rmit.mgdb.service.ExperimentService;
import com.rmit.mgdb.service.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/paginated")
    public ResultsResponse<Experiment> getExperiments(@RequestParam Optional<Integer> page,
                                                      @RequestParam Optional<Integer> size) {
        return experimentService.getExperiments(page, size);
    }

    @GetMapping("/get")
    public ResponseEntity<Experiment> getById(@RequestParam Long id) {
        return new ResponseEntity<>(experimentService.getExperimentById(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@Valid @RequestBody SaveExperimentRequest experimentRequest, BindingResult result) {
        ResponseEntity<?> errorMap = validationErrorService.mapValidationErrors(result);
        if (errorMap != null)
            return errorMap;

        return new ResponseEntity<>(experimentService.saveExperiment(experimentRequest), HttpStatus.CREATED);
    }

    @PostMapping("/{id}/toggleDelete")
    public void toggleDeleteById(@PathVariable Long id) {
        experimentService.toggleExperimentDelete(id);
    }

    @PostMapping("/{id}/approve")
    public void approveById(@PathVariable Long id) {
        experimentService.approveExperiment(id);
    }

}
