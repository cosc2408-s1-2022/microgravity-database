package com.rmit.mgdb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Indexed
public class Subsystem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "testSubjectType", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Experiment> experiments;

    public enum Subsystems {
        POWER("Power"),
        THERMAL("Thermal"),
        COMMUNICATIONS("Communications"),
        DATA("Data"),
        PROPULSION("Propulsion"),
        ATTITUDE_DETERMINATION("Attitude Determination"),
        MECHANICAL("Mechanical");

        public final String string;

        Subsystems(String string) {
            this.string = string;
        }
    }

}
