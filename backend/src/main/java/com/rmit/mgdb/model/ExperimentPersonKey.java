package com.rmit.mgdb.model;

import com.google.common.base.Objects;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
public class ExperimentPersonKey implements Serializable {

    private Long experimentId;
    private Long personId;

    @Override
    public boolean equals(Object object) {
        if (this == object)
            return true;
        if (object == null || getClass() != object.getClass())
            return false;
        ExperimentPersonKey that = (ExperimentPersonKey) object;
        return experimentId.longValue() == that.experimentId.longValue() &&
               personId.longValue() == that.personId.longValue();
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(experimentId, personId);
    }
}
