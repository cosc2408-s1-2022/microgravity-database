package com.rmit.mgdb.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Experiment {

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String platform;
    private String toa;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "for_code_id")
    private ForCode forCode;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "seo_code_id")
    private SeoCode seoCode;
    private String leadInstitution;
    private String principalInvestigator;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "experiment_researcher",
               joinColumns = @JoinColumn(name = "researcher_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "experiment_id", referencedColumnName = "id"))
    private List<Researcher> researchers;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "mission_id")
    private Mission mission;

}
