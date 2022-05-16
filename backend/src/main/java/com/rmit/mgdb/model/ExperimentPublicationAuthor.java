package com.rmit.mgdb.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Getter
@Setter
public class ExperimentPublicationAuthor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Author first name cannot be blank.")
    private String firstName;

    @NotBlank(message = "Author last name cannot be blank.")
    private String lastName;

    @ManyToMany(mappedBy = "authors")
    private List<ExperimentPublication> experimentPublications;

}
