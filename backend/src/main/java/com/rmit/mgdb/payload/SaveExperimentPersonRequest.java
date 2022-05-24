package com.rmit.mgdb.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class SaveExperimentPersonRequest {

    @NotNull(message = "Person cannot be blank")
    private Long personId;
    @NotNull(message = "Role cannot be blank")
    private Long roleId;

}
