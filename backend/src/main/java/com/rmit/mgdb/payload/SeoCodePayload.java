package com.rmit.mgdb.payload;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.rmit.mgdb.model.Experiment;
import com.rmit.mgdb.model.SeoCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SeoCodePayload {

    private String code;
    private String name;

    @JsonIgnoreProperties({"mission", "platform", "forCode", "seoCode", "people"})
    private List<Experiment> experiments;

    public SeoCodePayload(SeoCode seoCode) {
        this.code = seoCode.getCode();
        this.name = seoCode.getName();
        this.experiments = seoCode.getExperiments();
    }

}
