package com.rmit.mgdb.payload;

import com.rmit.mgdb.model.Publication;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class SaveExperimentRequest {

    private Long id;

    @NotBlank(message = "Experiments must have a title.")
    private String title;

    @NotBlank(message = "Lead institution must be specified.")
    private String leadInstitution;

    @NotNull(message = "Experiments must belong to a mission.")
    private Long missionId;

    private String experimentObjectives;

    @Valid
    private SaveExperimentPersonRequest[] personRequests;

    @Valid
    private Publication[] publications;

    private MultipartFile[] attachmentFiles;

    private Long[] attachmentIds;

    @NotNull(message = "Activity must be specified.")
    private Long activityId;

    private Long toaId;

    private Long forCodeId;

    private Long seoCodeId;

    private Long subsystemId;

    private String spacecraft;

    private String payload;

    private Long testSubjectCount;

    private Long areaId;

    private Long testSubjectTypeId;

}
