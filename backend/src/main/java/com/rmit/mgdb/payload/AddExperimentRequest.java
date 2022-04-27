package com.rmit.mgdb.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class AddExperimentRequest {

    @NotBlank(message = "Experiments must have a title.")
    private String title;

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.
    private String toa;

    private String leadInstitution;

    private String experimentAim;

    private String experimentObjective;

    private String experimentModuleDrawing;

    private String experimentPublications;

    @NotNull(message = "Experiments must belong to a mission.")
    private Long missionId;

    @NotNull(message = "Experiments must be on a platform.")
    private Long platformId;

    @NotNull(message = "Experiments must have an FOR code specified.")
    private Long forCodeId;

    @NotNull(message = "Experiments must have an SEO code specified.")
    private Long seoCodeId;

    private AddExperimentPersonRequest[] experimentPersonRequests;

}
