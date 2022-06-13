package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    Page<Person> findPeopleBy(Pageable pageable);

    List<Person> findAllByApprovedAndDeleted(boolean approved, boolean deleted);

    Optional<Person> findByIdAndApprovedAndDeleted(Long id, boolean approved, boolean deleted);

}
