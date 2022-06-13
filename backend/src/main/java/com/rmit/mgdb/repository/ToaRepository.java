package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.Toa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToaRepository extends JpaRepository<Toa, Long> {
}
