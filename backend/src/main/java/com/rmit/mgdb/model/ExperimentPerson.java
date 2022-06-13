package com.rmit.mgdb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.mapper.pojo.bridge.mapping.annotation.IdentifierBridgeRef;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.DocumentId;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.IndexedEmbedded;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Indexed
public class ExperimentPerson {

    @EmbeddedId
    @DocumentId(identifierBridge = @IdentifierBridgeRef(type = ExperimentPersonKeyIdentifierBridge.class))
    private ExperimentPersonKey id;

    @ManyToOne
    @JoinColumn(name = "role_id")
    @IndexedEmbedded
    private Role role;

    @ManyToOne
    @JoinColumn(name = "experiment_id")
    @MapsId("experimentId")
    @JsonIgnore
    private Experiment experiment;

    @ManyToOne
    @JoinColumn(name = "person_id")
    @MapsId("personId")
    @IndexedEmbedded
    private Person person;

}
