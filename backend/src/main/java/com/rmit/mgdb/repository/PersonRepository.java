package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    Page<Person> findPeopleBy(Pageable pageable);

}
