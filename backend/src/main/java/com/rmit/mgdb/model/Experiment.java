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
    private String toa;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "for_code_id")
    private ForCode forCode;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "seo_code_id")
    private SeoCode seoCode;
    private String leadInstitution;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "experiment_person",
               joinColumns = @JoinColumn(name = "person_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "experiment_id", referencedColumnName = "id"))
    private List<Person> people;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "platform_id")
    private Platform platform;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "mission_id")
    private Mission mission;

}
