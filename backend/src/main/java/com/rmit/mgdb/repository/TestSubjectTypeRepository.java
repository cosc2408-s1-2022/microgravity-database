package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.TestSubjectType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestSubjectTypeRepository extends JpaRepository<TestSubjectType, Long> {
}
