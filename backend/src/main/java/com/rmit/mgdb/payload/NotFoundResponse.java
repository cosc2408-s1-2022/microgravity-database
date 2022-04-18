package com.rmit.mgdb.payload;

import lombok.Getter;
import lombok.Setter;

/**
 * The response payload to send for when a requested entity is not found.
 */
@Getter
@Setter
public class NotFoundResponse {

    private final String message;
    private final Long id;

    public NotFoundResponse(String message, Long id) {
        this.message = message;
        this.id = id;
    }

}
