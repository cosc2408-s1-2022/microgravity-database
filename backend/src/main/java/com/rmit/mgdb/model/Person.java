package com.rmit.mgdb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.GenericField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Date;
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
    @NotBlank(message = "First name cannot be blank.")
    private String firstName;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    @NotBlank(message = "Family name cannot be blank.")
    private String familyName;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String affiliation;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String city;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String state;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String country;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    @Email(message = "Not a valid email address.")
    private String email;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String phone;

    @GenericField
    private boolean deleted;

    @GenericField
    private boolean approved;

    private Date createdAt;

    private Date updatedAt;

    @OneToMany(mappedBy = "person")
    @JsonIgnore
    private List<ExperimentPerson> experiments;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

}
