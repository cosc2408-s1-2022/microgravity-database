package com.rmit.mgdb.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.IndexedEmbedded;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Getter
@Setter
@Indexed
public class Experiment {

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String title;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String toa;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String leadInstitution;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String experimentAim;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String experimentObjective;

    // TODO Fields "experimentModuleDrawing" and "experimentPublications" might be collection types.
    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String experimentModuleDrawing;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String experimentPublications;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    @IndexedEmbedded
    @NotNull
    private Mission mission;

    @ManyToOne
    @JoinColumn(name = "platform_id")
    @IndexedEmbedded
    @NotNull
    private Platform platform;

    @ManyToOne
    @JoinColumn(name = "for_code_id")
    @IndexedEmbedded
    @NotNull
    private ForCode forCode;

    @ManyToOne
    @JoinColumn(name = "seo_code_id")
    @IndexedEmbedded
    @NotNull
    private SeoCode seoCode;

    @OneToMany(mappedBy = "experiment")
    @IndexedEmbedded
    private List<ExperimentPerson> people;

}
