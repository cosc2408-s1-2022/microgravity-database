package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.ExperimentAttachment;
import com.rmit.mgdb.repository.ExperimentAttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ExperimentAttachmentService {

    private final ExperimentAttachmentRepository experimentAttachmentRepository;

    @Autowired
    public ExperimentAttachmentService(
            ExperimentAttachmentRepository experimentAttachmentRepository) {
        this.experimentAttachmentRepository = experimentAttachmentRepository;
    }

    public ExperimentAttachment findById(Long id) {
        return experimentAttachmentRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Experiment attachment could not be found.", id));
    }

    public void save(ExperimentAttachment experimentAttachment) {
        experimentAttachmentRepository.save(experimentAttachment);
    }

    @Transactional
    public void deleteAllByExperimentId(Long id) {
        experimentAttachmentRepository.deleteAllByExperiment_Id(id);
    }
}
