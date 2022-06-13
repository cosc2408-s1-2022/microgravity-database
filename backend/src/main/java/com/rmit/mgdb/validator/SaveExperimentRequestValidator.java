package com.rmit.mgdb.validator;

import com.rmit.mgdb.model.Activity.Activities;
import com.rmit.mgdb.payload.SaveExperimentRequest;
import com.rmit.mgdb.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Implementation of the {@link Validator} for the {@link SaveExperimentRequest} data model validation.
 */
@Component
public class SaveExperimentRequestValidator implements Validator {

    private final ActivityService activityService;

    @Autowired
    public SaveExperimentRequestValidator(ActivityService activityService) {
        this.activityService = activityService;
    }

    @Override
    public boolean supports(@NonNull Class<?> clazz) {
        return SaveExperimentRequest.class.equals(clazz);
    }

    /**
     * Validates an {@link SaveExperimentRequest} object.
     */
    @Override
    public void validate(@NonNull Object object, @NonNull Errors errors) {
        SaveExperimentRequest experiment = (SaveExperimentRequest) object;
        if (experiment.getActivityId() == null)
            return;

        String activity = activityService.getActivityById(experiment.getActivityId()).getName();
        if (activity.equals(Activities.SCIENTIFIC_RESEARCH.string)) {
            if (experiment.getToaId() == null)
                errors.rejectValue("toaId", "experiment.toaId.required",
                                   "ToA must be specified.");

            if (experiment.getForCodeId() == null)
                errors.rejectValue("forCodeId", "experiment.forCodeId.required",
                                   "FoR code must be specified.");

            if (experiment.getSeoCodeId() == null)
                errors.rejectValue("seoCodeId", "experiment.seoCodeId.required",
                                   "SEO code must be specified.");
        } else if (activity.equals(Activities.INDUSTRY.string)) {
            if (experiment.getSpacecraft() == null || experiment.getSpacecraft().isBlank())
                errors.rejectValue("spacecraft", "experiment.spacecraft.required",
                                   "Spacecraft must not be blank.");

            if (experiment.getSubsystemId() == null)
                errors.rejectValue("subsystemId", "experiment.subsystemId.required",
                                   "Subsystem must be specified.");

            if (experiment.getPayload() == null || experiment.getPayload().isBlank())
                errors.rejectValue("payload", "experiment.payload.required",
                                   "Payload must not be blank.");
        } else if (activity.equals(Activities.HUMAN_SPACEFLIGHT.string)) {
            if (experiment.getTestSubjectCount() == null)
                errors.rejectValue("testSubjectCount", "experiment.testSubjectCount.required",
                                   "Number of test subjects must be specified.");
            else if (experiment.getTestSubjectCount() < 0)
                errors.rejectValue("testSubjectCount", "experiment.testSubjectCount.invalid",
                                   "Number of test subjects cannot be negative.");

            if (experiment.getAreaId() == null)
                errors.rejectValue("areaId", "experiment.areaId.required",
                                   "Area must be specified.");

            if (experiment.getTestSubjectTypeId() == null)
                errors.rejectValue("testSubjectTypeId", "experiment.testSubjectTypeId.required",
                                   "Test subject type must be specified.");
        }
    }

}
