package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.Mission;
import com.rmit.mgdb.payload.AddMissionRequest;
import com.rmit.mgdb.payload.MissionPayload;
import com.rmit.mgdb.service.MissionService;
import com.rmit.mgdb.service.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/missions")
public class MissionController {

    private final MissionService missionService;
    private final ValidationErrorService validationErrorService;

    @Autowired
    public MissionController(MissionService missionService,
                             ValidationErrorService validationErrorService) {
        this.missionService = missionService;
        this.validationErrorService = validationErrorService;
    }

    @GetMapping
    public List<Mission> getAll() {
        return missionService.getAllMissions();
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@Valid @RequestBody AddMissionRequest missionRequest, BindingResult result) {
        ResponseEntity<?> errorMap = validationErrorService.mapValidationErrors(result);
        if (errorMap != null)
            return errorMap;

        return new ResponseEntity<>(missionService.addMission(missionRequest), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public MissionPayload getById(@PathVariable Long id) {
        return missionService.getById(id);
    }

}
