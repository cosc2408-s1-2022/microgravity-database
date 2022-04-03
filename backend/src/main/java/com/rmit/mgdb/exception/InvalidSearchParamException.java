package com.rmit.mgdb.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when a one or more of the search request params are invalid.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class InvalidSearchParamException extends RuntimeException {

    public InvalidSearchParamException(String message) {
        super(message);
    }

}
