package com.rmit.mgdb.service;

import com.rmit.mgdb.model.ExperimentPublication;
import com.rmit.mgdb.model.ExperimentPublicationAuthor;
import com.rmit.mgdb.repository.ExperimentPublicationAuthorRepository;
import com.rmit.mgdb.repository.ExperimentPublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ExperimentPublicationService {

    private final ExperimentPublicationRepository experimentPublicationRepository;
    private final ExperimentPublicationAuthorRepository experimentPublicationAuthorRepository;

    @Autowired
    public ExperimentPublicationService(ExperimentPublicationRepository experimentPublicationRepository,
                                        ExperimentPublicationAuthorRepository experimentPublicationAuthorRepository) {
        this.experimentPublicationRepository = experimentPublicationRepository;
        this.experimentPublicationAuthorRepository = experimentPublicationAuthorRepository;
    }

    public ExperimentPublication saveExperimentPublication(ExperimentPublication experimentPublication) {
        return experimentPublicationRepository.saveAndFlush(experimentPublication);
    }

    public ExperimentPublicationAuthor saveExperimentPublicationAuthor(
            ExperimentPublicationAuthor experimentPublicationAuthor) {
        return experimentPublicationAuthorRepository.saveAndFlush(experimentPublicationAuthor);
    }

    @Transactional
    public void removeAllExperimentPublications(Long id) {
        experimentPublicationRepository.deleteAllByExperiment_Id(id);
    }

}
