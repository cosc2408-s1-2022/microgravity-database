package com.rmit.mgdb.controller;

import com.rmit.mgdb.payload.SeoCodePayload;
import com.rmit.mgdb.service.SeoCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/seoCodes")
public class SeoCodeController {

    private final SeoCodeService seoCodeService;

    @Autowired
    public SeoCodeController(SeoCodeService seoCodeService) {
        this.seoCodeService = seoCodeService;
    }

    @GetMapping
    public List<SeoCodePayload> getAll() {
        return seoCodeService.getAllSeoCode();
    }

    @GetMapping("/{id}")
    public SeoCodePayload getById(@PathVariable Long id) {
        return seoCodeService.getById(id);
    }

}
