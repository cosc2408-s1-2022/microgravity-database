package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.exception.UsernameAlreadyExistsException;
import com.rmit.mgdb.exception.UsernameNotFoundException;
import com.rmit.mgdb.model.User;
import com.rmit.mgdb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.rmit.mgdb.util.Constants.DEFAULT_PAGE_SIZE;

/**
 * Service layer for the {@link User} JPA entity.
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Saves a new user into the database.
     */
    public User saveUser(User user) {
        if (userRepository.existsByUsername(user.getUsername()))
            throw new UsernameAlreadyExistsException(
                    String.format("User by username %s already exists.", user.getUsername()));

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * Get a user by their id.
     */
    public User getUserById(Long id) {
        return userRepository.findById(id)
                             .orElseThrow(() -> new NotFoundException("User could not be found.", id));
    }

    /**
     * Get a user by their username.
     */
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                             .orElseThrow(() -> new UsernameNotFoundException("User could not be found.", username));
    }


    /**
     * Get all users, optionally paginated.
     */
    public Page<User> getUsers(Optional<Integer> page, Optional<Integer> size) {
        if (page.isPresent() && size.isPresent()) {
            return userRepository.findUsersBy(PageRequest.of(page.orElse(0), size.orElse(DEFAULT_PAGE_SIZE)));
        } else {
            return userRepository.findUsersBy(Pageable.unpaged());
        }
    }

}
