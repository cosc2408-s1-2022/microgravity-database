package com.rmit.mgdb.service;

import com.rmit.mgdb.payload.SeoCodePayload;
import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.SeoCode;
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

    public SeoCode getSeoCodeById(Long id) {
        return seoCodeRepository.findById(id)
                                .orElseThrow(() -> new NotFoundException("SEO code could not be found.", id));
    }

}
