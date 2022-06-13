package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperimentPublicationAuthorRepository extends JpaRepository<Author, Long> {
}
