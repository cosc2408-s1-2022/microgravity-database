package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.ForCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForCodeRepository extends JpaRepository<ForCode, Long> {
}
