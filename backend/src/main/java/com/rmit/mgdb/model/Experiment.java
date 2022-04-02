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
public class Experiment {

    /*
     * FIXME Delete these comments.
     * @Id marks it as the primary key.
     * Can also auto-generate it with, @GeneratedValue(strategy = GenerationType.{AUTO/IDENTITY})
     */
    @Id
    private String id;

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.

    private String name;
    private String Platform;
    private String TOA;
    //Foreign key
    private int FOR_CODE;
    //Foreign key
    private int SEO_CODE;
    private String Lead_Institution;
    private String Principal_Investigator;
    private String Researcher;
    private String Researcher_2;
    private String Researcher_3;
    //Foreign key

    //Relationships
    @ManyToOne
    @JoinColumn(name = "mission_id", nullable = false)
    private Mission mission;

    @ManyToOne
    @JoinColumn(name = "FORs_code", nullable = false)
    private FORs for;

    @ManyToOne
    @JoinColumn(name = "SEOs_code", nullable = false)
    private SEOs seo;



}