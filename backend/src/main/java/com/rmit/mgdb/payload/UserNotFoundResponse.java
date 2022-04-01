package com.rmit.mgdb.payload;

import lombok.Getter;
import lombok.Setter;

/**
 * The response payload to send {@link com.rmit.mgdb.exception.UserNotFoundException} is thrown.
 */
@Getter
@Setter
public class UserNotFoundResponse {

    private String id;

    public UserNotFoundResponse(String field) {
        this.id = field;
    }

}
