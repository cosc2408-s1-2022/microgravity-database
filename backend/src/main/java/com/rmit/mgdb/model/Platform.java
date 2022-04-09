package com.rmit.mgdb.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Platform {

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany(mappedBy = "platform", cascade = CascadeType.ALL)
    private List<Experiment> experiments;
    @OneToMany(mappedBy = "platform", cascade = CascadeType.ALL)
    private List<Mission> missions;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "platform_for_code",
               joinColumns = @JoinColumn(name = "for_code_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "platform_id", referencedColumnName = "id"))
    private List<ForCode> forCodes;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "platform_seo_code",
               joinColumns = @JoinColumn(name = "seo_code_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "platform_id", referencedColumnName = "id"))
    private List<SeoCode> seoCodes;
}
