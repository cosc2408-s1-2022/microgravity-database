package com.rmit.mgdb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rmit.mgdb.util.DateUtil;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.GenericField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

import javax.persistence.*;
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

    @GenericField
    private Date launchDate;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String launchDateString;

    @GenericField
    private Date startDate;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String startDateString;

    @GenericField
    private Date endDate;

    @FullTextField(analyzer = "index_analyzer", searchAnalyzer = "search_analyzer")
    private String endDateString;

    @OneToMany(mappedBy = "mission", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Experiment> experiments;

    private Long experimentCount;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private Platform platform;

    @PrePersist
    protected void onCreate() {
        synchroniseFields();
    }

    @PreUpdate
    protected void onUpdate() {
        synchroniseFields();
    }

    private void synchroniseFields() {
        launchDateString = launchDate == null ? null : DateUtil.format(launchDate);
        startDateString = startDate == null ? null : DateUtil.format(startDate);
        endDateString = endDate == null ? null : DateUtil.format(endDate);
        experimentCount = (long) (experiments == null ? 0 : experiments.size());
    }

}
