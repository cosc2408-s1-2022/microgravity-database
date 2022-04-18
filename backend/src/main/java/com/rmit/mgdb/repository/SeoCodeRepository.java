package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.SeoCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeoCodeRepository extends JpaRepository<SeoCode, Long> {
}
