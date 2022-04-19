package com.rmit.mgdb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.*;

import javax.persistence.*;
import java.time.LocalDate;
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

    @GenericField
    private LocalDate launchDate;

    @GenericField
    private LocalDate startDate;

    @GenericField
    private LocalDate endDate;

    @OneToMany(mappedBy = "mission", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Experiment> experiments;

    private Long experimentCount;

    @ManyToOne
    @IndexedEmbedded
    @JsonIgnore
    private Platform platform;

    private String getLocalDateStringOrEmpty(LocalDate date) {
        if (date == null)
            return "";

        return String.valueOf(date.getYear());
    }

    @Transient
    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    @IndexingDependency(derivedFrom = @ObjectPath(@PropertyValue(propertyName = "launchDate")))
    public String getLaunchDateString() {
        return getLocalDateStringOrEmpty(launchDate);
    }

    @Transient
    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    @IndexingDependency(derivedFrom = @ObjectPath(@PropertyValue(propertyName = "startDate")))
    public String getStartDateString() {
        return getLocalDateStringOrEmpty(startDate);
    }

    @Transient
    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    @IndexingDependency(derivedFrom = @ObjectPath(@PropertyValue(propertyName = "endDate")))
    public String getEndDateString() {
        return getLocalDateStringOrEmpty(endDate);
    }

    @PrePersist
    protected void onCreate() {
        synchroniseFields();
    }

    @PreUpdate
    protected void onUpdate() {
        synchroniseFields();
    }

    private void synchroniseFields() {
        //        launchDateString = launchDate == null ? null : DateUtil.format(launchDate);
        //        startDateString = startDate == null ? null : DateUtil.format(startDate);
        //        endDateString = endDate == null ? null : DateUtil.format(endDate);
        experimentCount = (long) (experiments == null ? 0 : experiments.size());
    }

}
