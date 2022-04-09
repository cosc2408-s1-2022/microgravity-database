package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeopleRepository extends JpaRepository<Person, Long> {
}
