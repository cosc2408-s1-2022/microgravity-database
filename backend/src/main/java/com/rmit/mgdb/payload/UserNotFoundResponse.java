package com.rmit.mgdb.payload;

/**
 * The response payload to send {@link com.rmit.mgdb.exception.UserNotFoundException} is thrown.
 */
public class UserNotFoundResponse {

    private String id;

    public UserNotFoundResponse(String field) {
        this.id = field;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
