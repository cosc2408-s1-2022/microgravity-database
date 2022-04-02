package com.rmit.mgdb.service;

import com.rmit.mgdb.model.Researcher;
import com.rmit.mgdb.repository.ResearcherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResearcherService {

    private final ResearcherRepository researcherRepository;

    @Autowired
    public ResearcherService(ResearcherRepository researcherRepository) {
        this.researcherRepository = researcherRepository;
    }

    public List<Researcher> getAllResearcher() {
        return researcherRepository.findAll();
    }

}
