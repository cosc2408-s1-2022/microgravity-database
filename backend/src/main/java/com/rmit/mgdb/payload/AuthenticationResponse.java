package com.rmit.mgdb.payload;

import com.rmit.mgdb.model.User;

/**
 * The response payload to send when authentication succeeds.
 */
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

}
