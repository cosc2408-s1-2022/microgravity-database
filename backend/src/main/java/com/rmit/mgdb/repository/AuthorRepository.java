package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.ExperimentPublicationAuthor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<ExperimentPublicationAuthor, Long> {
}
