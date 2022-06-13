package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.Subsystem;
import com.rmit.mgdb.service.SubsystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/subsystems")
public class SubsystemController {

    private final SubsystemService subsystemService;

    @Autowired
    public SubsystemController(SubsystemService subsystemService) {
        this.subsystemService = subsystemService;
    }

    @GetMapping
    public List<Subsystem> getAll() {
        return subsystemService.getAllSubsystems();
    }

}
