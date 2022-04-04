package com.rmit.mgdb.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Mission {

    // TODO Deduce value constraints e.g., @NotBlank/@NotNull for required fields, @Pattern for regex.
    @Id
    private String id;
    private String platform;
    private Date launchDate;
    private Date startDate;
    private Date endDate;
    @OneToMany(mappedBy = "mission", cascade = CascadeType.ALL)
    private List<Experiment> experiments;

}
