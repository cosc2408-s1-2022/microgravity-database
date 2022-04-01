package com.rmit.mgdb.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

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
public class Mission {

    /*
     * FIXME Delete these comments.
     * @Id marks it as the primary key.
     * Can also auto-generate it with, @GeneratedValue(strategy = GenerationType.{AUTO/IDENTITY})
     */
    @Id
    private String id;

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.
    private String spaceStation;
    private String spaceShuttle;
    private String retrievableCapsule;
    private String soundingRocket;
    private String parabolicFlight;
    private String dropTower;
    private Date launchDate;
    private Date endDate;

}
