package com.rmit.mgdb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Indexed
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String name;

    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Experiment> experiments;

    public Activity(String name) {
        this.name = name;
    }

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
