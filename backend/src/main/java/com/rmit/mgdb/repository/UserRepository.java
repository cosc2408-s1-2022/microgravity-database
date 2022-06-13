package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * JPA repository for the {@link User} entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find a user by username.
     */
    Page<User> findUsersBy(Pageable pageable);

    /**
     * Find a user by username.
     */
    Optional<User> findByUsername(String username);

    /**
     * Find whether a user by username already exists.
     */
    boolean existsByUsername(String username);

}
