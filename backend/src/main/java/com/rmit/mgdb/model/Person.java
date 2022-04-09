package com.rmit.mgdb.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Person {

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String familyName;
    private String affiliation;
    private String city;
    private String state;
    private String country;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "role_id")
    private Role role;
    @ManyToMany(mappedBy = "people", cascade = CascadeType.ALL)
    private List<Experiment> experiments;

}
