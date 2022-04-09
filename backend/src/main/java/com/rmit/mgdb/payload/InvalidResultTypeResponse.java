package com.rmit.mgdb.payload;

import com.rmit.mgdb.exception.InvalidResultTypeException;
import lombok.Getter;
import lombok.Setter;

/**
 * The response payload to send {@link InvalidResultTypeException} is thrown.
 */
@Getter
@Setter
public class InvalidResultTypeResponse {

    private final String resultType;

    public InvalidResultTypeResponse(String resultType) {
        this.resultType = resultType;
    }

}
