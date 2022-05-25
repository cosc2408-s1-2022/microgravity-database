package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.ExperimentPublication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicationRepository extends JpaRepository<ExperimentPublication, Long> {
}
