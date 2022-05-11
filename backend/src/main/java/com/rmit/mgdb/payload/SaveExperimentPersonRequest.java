package com.rmit.mgdb.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveExperimentPersonRequest {

    private Long personId;
    private Long roleId;

}
