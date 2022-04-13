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
public class Person {

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String firstName;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String familyName;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String affiliation;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String city;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String state;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String country;

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ExperimentPerson> experiments;

}