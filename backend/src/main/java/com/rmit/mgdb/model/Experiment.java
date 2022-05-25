package com.rmit.mgdb.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.GenericField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.IndexedEmbedded;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Indexed
public class Experiment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String title;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String leadInstitution;

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

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    @Length(max = 1023)
    private String experimentObjectives;

    @OneToMany(mappedBy = "experiment")
    @IndexedEmbedded
    private List<ExperimentPerson> people;

    @OneToMany(mappedBy = "experiment", cascade = CascadeType.ALL)
    private List<Publication> publications;

    @OneToMany(mappedBy = "experiment")
    private List<Attachment> attachments;

    @ManyToOne
    @JoinColumn(name = "activity_id")
    @IndexedEmbedded
    @NotNull
    private Activity activity;

    @IndexedEmbedded
    @ManyToOne
    @JoinColumn(name = "toa_id")
    private Toa toa;

    @ManyToOne
    @JoinColumn(name = "for_code_id")
    @IndexedEmbedded
    private ForCode forCode;

    @ManyToOne
    @JoinColumn(name = "seo_code_id")
    @IndexedEmbedded
    private SeoCode seoCode;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    @Length(max = 1023)
    private String spacecraft;

    @ManyToOne
    @JoinColumn(name = "subsystem_id")
    @IndexedEmbedded
    @NotNull
    private Subsystem subsystem;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    @Length(max = 1023)
    private String payload;

    private Long testSubjectCount;

    @ManyToOne
    @JoinColumn(name = "area_id")
    @IndexedEmbedded
    @NotNull
    private Area area;

    @ManyToOne
    @JoinColumn(name = "test_subject_type_id")
    @IndexedEmbedded
    @NotNull
    private TestSubjectType testSubjectType;

    @GenericField
    private boolean approved;

    @GenericField
    private boolean deleted;

    private Date createdAt;

    private Date updatedAt;

    /**
     * Saves the timestamp of creation.
     */
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    /**
     * Updates the timestamp of modification.
     */
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

}
