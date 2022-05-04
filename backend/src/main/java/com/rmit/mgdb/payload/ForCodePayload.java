package com.rmit.mgdb.payload;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.rmit.mgdb.model.Experiment;
import com.rmit.mgdb.model.ForCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ForCodePayload {

    private Long id;
    private String code;
    private String name;

    @JsonIgnoreProperties({"mission", "platform", "forCode", "seoCode", "people"})
    private List<Experiment> experiments;

    public ForCodePayload(ForCode forCode) {
        this.id = forCode.getId();
        this.code = forCode.getCode();
        this.name = forCode.getName();
        this.experiments = forCode.getExperiments();
    }

}
