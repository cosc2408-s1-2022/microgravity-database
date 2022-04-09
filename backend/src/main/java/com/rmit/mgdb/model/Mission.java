package com.rmit.mgdb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Indexed
public class Mission {

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String name;

    private Date launchDate;

    private Date startDate;

    private Date endDate;

    @OneToMany(mappedBy = "mission", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Experiment> experiments;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private Platform platform;

}
