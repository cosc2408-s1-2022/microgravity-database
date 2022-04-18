package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.exception.UsernameAlreadyExistsException;
import com.rmit.mgdb.exception.UsernameNotFoundException;
import com.rmit.mgdb.model.User;
import com.rmit.mgdb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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

}
