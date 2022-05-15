package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.Mission;
import com.rmit.mgdb.payload.AddMissionRequest;
import com.rmit.mgdb.payload.MissionPayload;
import com.rmit.mgdb.payload.ResultsResponse;
import com.rmit.mgdb.service.MissionService;
import com.rmit.mgdb.service.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

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
    public List<MissionPayload> getAll() {
        return missionService.getAllMissions();
    }

    @GetMapping("/paginated")
    public ResultsResponse<Mission> getMissions(@RequestParam Optional<Integer> page,
                                                @RequestParam Optional<Integer> size) {
        return missionService.getMissions(page, size);
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@Valid @RequestBody AddMissionRequest missionRequest, BindingResult result) {
        ResponseEntity<?> errorMap = validationErrorService.mapValidationErrors(result);
        if (errorMap != null)
            return errorMap;

        return new ResponseEntity<>(missionService.saveMission(missionRequest), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public MissionPayload getById(@PathVariable Long id) {
        return missionService.getMissionPayloadById(id);
    }

    @PostMapping("/{id}/toggleDelete")
    public void toggleDeleteById(@PathVariable Long id) {
        missionService.toggleMissionDelete(id);
    }

    @PostMapping("/{id}/approve")
    public void approveById(@PathVariable Long id) {
        missionService.approveMission(id);
    }

}
