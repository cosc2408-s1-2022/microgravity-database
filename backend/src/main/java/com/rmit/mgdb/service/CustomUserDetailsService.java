package com.rmit.mgdb.service;

import com.rmit.mgdb.model.CustomUserDetails;
import com.rmit.mgdb.model.User;
import com.rmit.mgdb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Implementation of the {@link UserDetailsService} for Spring Security.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Defines how users are to be loaded given username.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        user.orElseThrow(
                () -> new UsernameNotFoundException(String.format("User by username %s not found.", username)));
        return user.map(CustomUserDetails::new).get();
    }

}
