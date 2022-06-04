package com.rmit.mgdb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.engine.backend.types.Sortable;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.IndexedEmbedded;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.KeywordField;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Indexed
public class ForCode {

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String code;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    @KeywordField(name = "name_sort", normalizer = "english", sortable = Sortable.YES)
    private String name;

    @OneToMany(mappedBy = "forCode")
    @JsonIgnore
    private List<Experiment> experiments;

    @ManyToMany(mappedBy = "forCodes")
    @IndexedEmbedded
    @JsonIgnore
    private List<Platform> platforms;

}
