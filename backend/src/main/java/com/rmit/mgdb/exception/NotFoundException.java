package com.rmit.mgdb.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when a requested entity could not be found.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
@Getter
@Setter
public class NotFoundException extends RuntimeException {

    private final Long id;

    public NotFoundException(String message, Long id) {
        super(message);
        this.id = id;
    }

}
