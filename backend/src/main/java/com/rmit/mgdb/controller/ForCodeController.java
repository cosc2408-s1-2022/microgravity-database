package com.rmit.mgdb.controller;

import com.rmit.mgdb.payload.ForCodePayload;
import com.rmit.mgdb.service.ForCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/forCodes")
public class ForCodeController {

    private final ForCodeService forCodeService;

    @Autowired
    public ForCodeController(ForCodeService forCodeService) {
        this.forCodeService = forCodeService;
    }

    @GetMapping
    public List<ForCodePayload> getAll() {
        return forCodeService.getAllForCode();
    }

    @GetMapping("/{id}")
    public ForCodePayload getById(@PathVariable Long id) {
        return forCodeService.getForCodePayloadById(id);
    }

}
