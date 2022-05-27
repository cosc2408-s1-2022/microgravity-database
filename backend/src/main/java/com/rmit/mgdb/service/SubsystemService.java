package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.Subsystem;
import com.rmit.mgdb.repository.SubsystemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubsystemService {

    private final SubsystemRepository subsystemRepository;

    @Autowired
    public SubsystemService(SubsystemRepository subsystemRepository) {
        this.subsystemRepository = subsystemRepository;
    }

    public List<Subsystem> getAllSubsystems() {
        return subsystemRepository.findAll();
    }

    public Subsystem getSubsystemById(Long id) {
        return subsystemRepository.findById(id)
                                  .orElseThrow(() -> new NotFoundException("Subsystem could not be found.", id));
    }

}
