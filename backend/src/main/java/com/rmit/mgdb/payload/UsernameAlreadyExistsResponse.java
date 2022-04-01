package com.rmit.mgdb.payload;

import lombok.Getter;
import lombok.Setter;

/**
 * The response payload to send {@link com.rmit.mgdb.exception.UsernameAlreadyExistsException} is thrown.
 */
@Getter
@Setter
public class UsernameAlreadyExistsResponse {

    private String username;

    public UsernameAlreadyExistsResponse(String username) {
        this.username = username;
    }

}
