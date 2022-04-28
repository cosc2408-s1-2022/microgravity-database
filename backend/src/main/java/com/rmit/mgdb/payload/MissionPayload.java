package com.rmit.mgdb.payload;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.rmit.mgdb.model.Experiment;
import com.rmit.mgdb.model.Mission;
import com.rmit.mgdb.model.Platform;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class MissionPayload {

    private String name;
    private LocalDate launchDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long experimentCount;

    @JsonIgnoreProperties({"forCodes", "seoCodes"})
    private Platform platform;

    @JsonIgnoreProperties({"mission", "platform", "forCode", "seoCode", "people"})
    private List<Experiment> experiments;

    public MissionPayload(Mission mission) {
        this.name = mission.getName();
        this.launchDate = mission.getLaunchDate();
        this.startDate = mission.getStartDate();
        this.endDate = mission.getStartDate();
        this.experimentCount = mission.getExperimentCount();
        this.platform = mission.getPlatform();
        this.experiments = mission.getExperiments();
    }

}
