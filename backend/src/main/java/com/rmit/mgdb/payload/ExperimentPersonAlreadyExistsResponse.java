package com.rmit.mgdb.payload;

import lombok.Getter;
import lombok.Setter;

/**
 * The response payload to send {@link com.rmit.mgdb.exception.ExperimentPersonAlreadyExistsException} is thrown.
 */
@Getter
@Setter
public class ExperimentPersonAlreadyExistsResponse {

    private final String message;
    private final Long experimentId;
    private final Long personId;
    private final Long roleId;

    public ExperimentPersonAlreadyExistsResponse(String message, Long experimentId, Long personId, Long roleId) {
        this.message = message;
        this.experimentId = experimentId;
        this.personId = personId;
        this.roleId = roleId;
    }
}
