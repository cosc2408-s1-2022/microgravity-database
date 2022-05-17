package com.rmit.mgdb.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class InvalidExperimentAttachmentResponse {

    private String message;
    private String filename;

}
