package com.rmit.mgdb.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class AddMissionRequest {

    private Long id;

    @NotBlank(message = "Name must not be blank.")
    private String name;

    @NotNull(message = "A valid mission launch date is required.")
    private String launchDate;

    private String startDate;

    private String endDate;

    @NotNull(message = "Mission must be on a platform.")
    private Long platformId;

}
