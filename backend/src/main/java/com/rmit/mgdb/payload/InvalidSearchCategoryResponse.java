package com.rmit.mgdb.payload;

import lombok.Getter;
import lombok.Setter;

/**
 * The response payload to send {@link com.rmit.mgdb.exception.InvalidSearchCategoryException} is thrown.
 */
@Getter
@Setter
public class InvalidSearchCategoryResponse {

    private final String category;

    public InvalidSearchCategoryResponse(String category) {
        this.category = category;
    }

}
