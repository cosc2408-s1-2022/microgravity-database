package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.Subsystem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubsystemRepository extends JpaRepository<Subsystem, Long> {
}
