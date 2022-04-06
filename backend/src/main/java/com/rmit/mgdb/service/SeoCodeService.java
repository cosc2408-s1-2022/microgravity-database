package com.rmit.mgdb.service;

import com.rmit.mgdb.model.SeoCode;
import com.rmit.mgdb.repository.SeoCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeoCodeService {

    private final SeoCodeRepository seoCodeRepository;

    @Autowired
    public SeoCodeService(SeoCodeRepository seoCodeRepository) {
        this.seoCodeRepository = seoCodeRepository;
    }

    public List<SeoCode> getAllSeoCode() {
        return seoCodeRepository.findAll();
    }

}
