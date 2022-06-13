package com.rmit.mgdb.service;

import com.rmit.mgdb.model.Author;
import com.rmit.mgdb.model.Publication;
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

    public Publication saveExperimentPublication(Publication publication) {
        return experimentPublicationRepository.saveAndFlush(publication);
    }

    public Author saveExperimentPublicationAuthor(
            Author author) {
        return experimentPublicationAuthorRepository.saveAndFlush(author);
    }

    @Transactional
    public void removeAllExperimentPublications(Long id) {
        experimentPublicationRepository.deleteAllByExperiment_Id(id);
    }

}
