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
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "area", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Experiment> experiments;

    public enum Areas {
        FOOD_SCIENCE("Food Science"),
        PHYSIOLOGY("Physiology"),
        SPACE_MEDICINE("Space Medicine"),
        WEARABLES("Wearables"),
        SPACESUITS("Space Suits");

        public final String string;

        Areas(String string) {
            this.string = string;
        }
    }

}
