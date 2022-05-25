package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.Area;
import com.rmit.mgdb.repository.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AreaService {

    private final AreaRepository areaRepository;

    @Autowired
    public AreaService(AreaRepository areaRepository) {
        this.areaRepository = areaRepository;
    }

    public List<Area> getAllAreas() {
        return areaRepository.findAll();
    }

    public Area getAreaById(Long id) {
        return areaRepository.findById(id)
                             .orElseThrow(() -> new NotFoundException("Area could not be found.", id));
    }

}
