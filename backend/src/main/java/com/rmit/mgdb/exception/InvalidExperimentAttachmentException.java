package com.rmit.mgdb.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when an attachment requested is invalid.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
@Getter
@Setter
public class InvalidExperimentAttachmentException extends RuntimeException {

    private final String filename;

    public InvalidExperimentAttachmentException(String message, String filename) {
        super(message);
        this.filename = filename;
    }

}
