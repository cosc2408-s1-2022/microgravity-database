package com.rmit.mgdb.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when a person with a role being added to an experiment already exists in the experiment with that role.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
@Getter
@Setter
public class ExperimentPersonAlreadyExistsException extends RuntimeException {

    private final Long experimentId;
    private final Long personId;
    private final Long roleId;

    public ExperimentPersonAlreadyExistsException(String message, Long experimentId, Long personId, Long roleId) {
        super(message);
        this.experimentId = experimentId;
        this.personId = personId;
        this.roleId = roleId;
    }

}
