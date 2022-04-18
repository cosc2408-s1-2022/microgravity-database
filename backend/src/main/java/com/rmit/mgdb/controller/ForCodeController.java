package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.ForCode;
import com.rmit.mgdb.service.ForCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/for-codes")
public class ForCodeController {

    private final ForCodeService forCodeService;

    @Autowired
    public ForCodeController(ForCodeService forCodeService) {
        this.forCodeService = forCodeService;
    }

    @GetMapping("/all")
    public List<ForCode> getAll() {
        return forCodeService.getAllForCode();
    }

}
