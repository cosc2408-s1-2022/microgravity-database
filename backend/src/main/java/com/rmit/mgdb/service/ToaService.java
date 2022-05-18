package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.Toa;
import com.rmit.mgdb.repository.ToaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToaService {

    private final ToaRepository toaRepository;

    @Autowired
    public ToaService(ToaRepository toaRepository) {
        this.toaRepository = toaRepository;
    }

    public List<Toa> getAllToas() {
        return toaRepository.findAll();
    }

    public Toa getToaById(Long id) {
        return toaRepository.findById(id)
                            .orElseThrow(() -> new NotFoundException("TOA could not be found.", id));
    }

}
