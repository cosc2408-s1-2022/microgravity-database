package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
 * FIXME Delete these comments.
 * Repository = Accessor for the entity's table (repository pattern).
 * https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/stereotype/Repository.html
 * TLDR: @Repository annotation + extend from JpaRepository + <TEntity, TKey> or <the entity the table belongs to, its primary key>
 */
@Repository
public interface MissionRepository extends JpaRepository<Mission, String> {
}
