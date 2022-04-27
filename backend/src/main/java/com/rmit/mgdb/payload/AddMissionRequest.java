package com.rmit.mgdb.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@Setter
public class AddMissionRequest {

    @NotBlank(message = "Mission name must not be blank.")
    private String name;

    @NotNull(message = "Mission launch year must be specified.")
    @Pattern(regexp = "^[1-9]\\d{3,}$", message = "Not a valid year.")
    private String launchDate;

    @Pattern(regexp = "^[1-9]\\d{3,}$", message = "Not a valid year.")
    private String startDate;

    @Pattern(regexp = "^[1-9]\\d{3,}$", message = "Not a valid year.")
    private String endDate;

    @NotNull(message = "Mission must be on a platform.")
    private Long platformId;

}
