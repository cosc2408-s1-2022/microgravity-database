package com.rmit.mgdb.payload;

/**
 * The response payload to send {@link com.rmit.mgdb.exception.UsernameAlreadyExistsException} is thrown.
 */
public class UsernameAlreadyExistsResponse {

    private String username;

    public UsernameAlreadyExistsResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
