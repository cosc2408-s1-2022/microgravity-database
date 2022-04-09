package com.rmit.mgdb.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Indexed
public class Platform {

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String name;

    @OneToMany(mappedBy = "platform", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Experiment> experiments;

    @OneToMany(mappedBy = "platform", cascade = CascadeType.ALL)
    @JsonIgnore
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
