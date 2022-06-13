package com.rmit.mgdb.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when a requested user could not be found.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
@Getter
@Setter
public class UsernameNotFoundException extends RuntimeException {

    private final String username;

    public UsernameNotFoundException(String message, String username) {
        super(message);
        this.username = username;
    }

}
