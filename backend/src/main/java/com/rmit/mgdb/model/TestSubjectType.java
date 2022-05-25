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
public class TestSubjectType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "subsystem", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Experiment> experiments;

    public enum TestSubjectTypes {
        MISSION_ASTRONAUT("Mission Astronaut"),
        TRAINEE_ASTRONAUT("Trainee Astronaut"),
        RESEARCHERS("Researchers");

        public final String string;

        TestSubjectTypes(String string) {
            this.string = string;
        }
    }

}
