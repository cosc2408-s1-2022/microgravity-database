package com.rmit.mgdb.service;

import com.rmit.mgdb.payload.ForCodePayload;
import com.rmit.mgdb.repository.ForCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ForCodeService {

    private final ForCodeRepository forCodeRepository;

    @Autowired
    public ForCodeService(ForCodeRepository forCodeRepository) {
        this.forCodeRepository = forCodeRepository;
    }

    public List<ForCodePayload> getAllForCode() {
        return forCodeRepository.findAll().stream().map(ForCodePayload::new).collect(Collectors.toList());
    }

    public ForCodePayload getById(Long id) {
        // TODO Throw exception on not found.
        return new ForCodePayload(forCodeRepository.findById(id).orElseThrow());
    }

}
