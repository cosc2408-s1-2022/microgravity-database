package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.ForCode;
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

    public ForCode getForCodeById(Long id) {
        return forCodeRepository.findById(id)
                                .orElseThrow(() -> new NotFoundException("FoR code could not be found.", id));
    }

    public ForCodePayload getForCodePayloadById(Long id) {
        return new ForCodePayload(getForCodeById(id));
    }

}
