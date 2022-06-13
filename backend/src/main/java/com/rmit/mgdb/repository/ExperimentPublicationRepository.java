package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperimentPublicationRepository extends JpaRepository<Publication, Long> {

    void deleteAllByExperiment_Id(Long id);

}
