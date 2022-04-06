package com.rmit.mgdb.exception;

/**
 * Thrown when a one or more of the categories specified in the category search param are invalid.
 */
public class InvalidSearchCategoryException extends RuntimeException {

    public InvalidSearchCategoryException(String message) {
        super(message);
    }

}
