package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.SeoCode;
import com.rmit.mgdb.service.SeoCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/seo-codes")
public class SeoCodeController {

    private final SeoCodeService sEOsService;

    @Autowired
    public SeoCodeController(SeoCodeService sEOsService) {
        this.sEOsService = sEOsService;
    }

    @GetMapping("/all")
    public List<SeoCode> getAll() {
        return sEOsService.getAllSeoCode();
    }

}
