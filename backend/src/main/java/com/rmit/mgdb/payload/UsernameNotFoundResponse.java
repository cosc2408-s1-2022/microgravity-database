package com.rmit.mgdb.payload;

import lombok.Getter;
import lombok.Setter;

/**
 * The response payload to send for when a requested user by given username is not found.
 */
@Getter
@Setter
public class UsernameNotFoundResponse {

    private final String message;
    private final String username;

    public UsernameNotFoundResponse(String message, String username) {
        this.message = message;
        this.username = username;
    }

}
