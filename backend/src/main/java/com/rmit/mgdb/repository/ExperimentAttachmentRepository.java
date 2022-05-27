package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperimentAttachmentRepository extends JpaRepository<Attachment, Long> {

    void deleteAllByExperiment_Id(Long id);

}
