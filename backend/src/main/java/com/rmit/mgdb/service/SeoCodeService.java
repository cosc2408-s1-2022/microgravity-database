package com.rmit.mgdb.service;

import com.rmit.mgdb.payload.SeoCodePayload;
import com.rmit.mgdb.repository.SeoCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeoCodeService {

    private final SeoCodeRepository seoCodeRepository;

    @Autowired
    public SeoCodeService(SeoCodeRepository seoCodeRepository) {
        this.seoCodeRepository = seoCodeRepository;
    }

    public List<SeoCodePayload> getAllSeoCode() {
        return seoCodeRepository.findAll().stream().map(SeoCodePayload::new).collect(Collectors.toList());
    }

    public SeoCodePayload getById(Long id) {
        // TODO Throw exception on not found.
        return new SeoCodePayload(seoCodeRepository.findById(id).orElseThrow());
    }

}
