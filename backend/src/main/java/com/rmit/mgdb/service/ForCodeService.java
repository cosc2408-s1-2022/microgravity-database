package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.ForCode;
import com.rmit.mgdb.repository.ForCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForCodeService {

    private final ForCodeRepository forCodeRepository;

    @Autowired
    public ForCodeService(ForCodeRepository forCodeRepository) {
        this.forCodeRepository = forCodeRepository;
    }

    public List<ForCode> getAllForCodes() {
        return forCodeRepository.findAll();
    }

    public ForCode getForCodeById(Long id) {
        return forCodeRepository.findById(id)
                                .orElseThrow(() -> new NotFoundException("FOR code could not be found.", id));
    }

}
