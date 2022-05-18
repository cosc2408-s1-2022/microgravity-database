package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.Toa;
import com.rmit.mgdb.service.ToaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/toas")
public class ToaController {

    private final ToaService toaService;

    @Autowired
    public ToaController(ToaService toaService) {
        this.toaService = toaService;
    }

    @GetMapping
    public List<Toa> getAll() {
        return toaService.getAllToas();
    }

}
