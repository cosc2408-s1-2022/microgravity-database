package com.rmit.mgdb.payload;

import lombok.Getter;
import lombok.Setter;

/**
 * The response payload to send {@link com.rmit.mgdb.exception.InvalidSearchParamException} is thrown.
 */
@Getter
@Setter
public class InvalidSearchParamResponse {

    private final String param;

    public InvalidSearchParamResponse(String param) {
        this.param = param;
    }

}
