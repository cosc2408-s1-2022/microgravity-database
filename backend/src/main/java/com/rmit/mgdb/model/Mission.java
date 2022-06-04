package com.rmit.mgdb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.engine.backend.types.Sortable;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Indexed
public class Mission {

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String name;

    @GenericField(sortable = Sortable.YES)
    private LocalDate launchDate;

    @GenericField
    private LocalDate startDate;

    @GenericField
    private LocalDate endDate;

    @OneToMany(mappedBy = "mission", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Experiment> experiments;

    private Long experimentCount;

    @GenericField
    private boolean approved;

    @GenericField
    private boolean deleted;

    private Date createdAt;

    private Date updatedAt;

    @ManyToOne
    @IndexedEmbedded
    @JsonIgnoreProperties({"forCodes", "seoCodes"})
    private Platform platform;

    private String getLocalDateStringOrEmpty(LocalDate date) {
        if (date == null)
            return "";

        return date.toString();
    }

    @Transient
    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    @IndexingDependency(derivedFrom = @ObjectPath(@PropertyValue(propertyName = "launchDate")))
    @JsonIgnore
    public String getLaunchDateString() {
        return getLocalDateStringOrEmpty(launchDate);
    }

    @Transient
    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    @IndexingDependency(derivedFrom = @ObjectPath(@PropertyValue(propertyName = "startDate")))
    @JsonIgnore
    public String getStartDateString() {
        return getLocalDateStringOrEmpty(startDate);
    }

    @Transient
    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    @IndexingDependency(derivedFrom = @ObjectPath(@PropertyValue(propertyName = "endDate")))
    @JsonIgnore
    public String getEndDateString() {
        return getLocalDateStringOrEmpty(endDate);
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
        synchroniseFields();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
        synchroniseFields();
    }

    private void synchroniseFields() {
        experimentCount = (long) (experiments == null ? 0 : experiments.size());
    }

}
