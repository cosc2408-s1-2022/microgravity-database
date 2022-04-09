package com.rmit.mgdb.exception;

/**
 * Thrown when the result type specified in the search param is unknown/invalid.
 */
public class InvalidResultTypeException extends RuntimeException {

    public InvalidResultTypeException(String message) {
        super(message);
    }

}
