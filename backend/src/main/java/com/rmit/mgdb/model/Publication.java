package com.rmit.mgdb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Getter
@Setter
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Valid
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "publication_author",
               joinColumns = @JoinColumn(name = "publication_id"),
               inverseJoinColumns = @JoinColumn(name = "author_id"))
    private List<Author> authors;

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
