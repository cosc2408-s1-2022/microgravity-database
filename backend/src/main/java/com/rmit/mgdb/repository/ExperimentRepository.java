package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.Experiment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperimentRepository extends JpaRepository<Experiment, Long> {

    Page<Experiment> findExperimentsByApprovedAndDeleted(Pageable pageable, boolean approved, boolean deleted);

}
