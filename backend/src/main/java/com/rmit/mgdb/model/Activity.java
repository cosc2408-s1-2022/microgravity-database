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
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Experiment> experiments;

    public enum Activities {
        SCIENTIFIC_RESEARCH("Scientific Research"),
        INDUSTRY("Industry"),
        HUMAN_SPACEFLIGHT("Human Spaceflight");

        public final String string;

        Activities(String string) {
            this.string = string;
        }
    }

}
