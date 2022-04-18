package com.rmit.mgdb.payload;

import com.rmit.mgdb.model.User;
import lombok.Getter;
import lombok.Setter;

/**
 * The response payload to send when authentication succeeds.
 */
@Getter
@Setter
public class AuthenticationResponse {

    private User user;
    private String jwt;

    // Default constructor is needed. Do not delete.
    public AuthenticationResponse() {
    }

    public AuthenticationResponse(User user, String jwt) {
        this.user = user;
        this.jwt = jwt;

        // Prevent serialisation of unnecessary fields.
        user.setId(null);
        user.setPassword(null);
    }

}
