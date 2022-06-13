package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.ExperimentPerson;
import com.rmit.mgdb.model.ExperimentPersonKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperimentPersonRepository extends JpaRepository<ExperimentPerson, ExperimentPersonKey> {

    void deleteAllByExperiment_Id(Long id);

}
