package com.rmit.mgdb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
public class ExperimentPublication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Valid
    @ManyToMany
    @JoinTable(name = "publication_author",
               joinColumns = @JoinColumn(name = "publication_id"),
               inverseJoinColumns = @JoinColumn(name = "author_id"))
    private List<ExperimentPublicationAuthor> authors;

    private String yearPublished;

    @NotBlank(message = "Title cannot be blank.")
    @Length(max = 1023)
    private String title;

    @Length(max = 1023)
    private String journal;

    private String volumeNumber;

    private String issueNumber;

    private String pagesUsed;

    private String doi;

    private String journalDatabase;

    @Length(max = 1023)
    private String url;

    private String accessDate;

    @ManyToOne
    @JoinColumn(name = "experiment_id")
    @JsonIgnore
    private Experiment experiment;

}
