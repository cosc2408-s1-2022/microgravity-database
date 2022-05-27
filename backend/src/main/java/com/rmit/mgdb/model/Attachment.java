package com.rmit.mgdb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Entity
@Getter
@Setter
public class Attachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Length(max = 1023)
    private String filename;

    @NotBlank
    @Pattern(regexp = "(^image/jpeg|image/png|application/pdf)", message = "Not a valid media type.")
    private String mediaType;

    @ManyToOne
    @JoinColumn(name = "experiment_id")
    @JsonIgnore
    private Experiment experiment;

}
