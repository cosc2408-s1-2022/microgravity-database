package com.rmit.mgdb.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Integer;

/*
 * FIXME Delete these comments.
 * Entity = A model/table in the database. Spring would create the schema based on the field's data types.
 * https://www.baeldung.com/jpa-entities
 * https://docs.oracle.com/javaee/7/api/javax/persistence/Entity.html
 * @Getter/@Setter are Lombok annotations to autogenerate getters/setters.
 */
@Entity
@Getter
@Setter
public class SEOs {

    /*
     * FIXME Delete these comments.
     * @Id marks it as the primary key.
     * Can also auto-generate it with, @GeneratedValue(strategy = GenerationType.{AUTO/IDENTITY})
     */
    @Id
    private int code;

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.

    private String name;

    //Relationship with experiement
    @OneToMany(mappedBy = "seos", cascade = CascadeType.ALL)
    private List<Experiment> experiments = new ArrayList<>();




}