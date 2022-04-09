package com.rmit.mgdb.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class SeoCode {

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String name;
    @OneToMany(mappedBy = "seoCode", cascade = CascadeType.ALL)
    private List<Experiment> experiments;
    @ManyToMany(mappedBy = "seoCodes", cascade = CascadeType.ALL)
    private List<Platform> platform;

}
