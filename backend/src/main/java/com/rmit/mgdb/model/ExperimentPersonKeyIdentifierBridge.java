package com.rmit.mgdb.model;

import org.hibernate.search.mapper.pojo.bridge.IdentifierBridge;
import org.hibernate.search.mapper.pojo.bridge.runtime.IdentifierBridgeFromDocumentIdentifierContext;
import org.hibernate.search.mapper.pojo.bridge.runtime.IdentifierBridgeToDocumentIdentifierContext;

public class ExperimentPersonKeyIdentifierBridge implements IdentifierBridge<ExperimentPersonKey> {

    @Override
    public String toDocumentIdentifier(ExperimentPersonKey propertyValue,
                                       IdentifierBridgeToDocumentIdentifierContext context) {
        return propertyValue.getExperimentId() + "_" + propertyValue.getPersonId();
    }

    @Override
    public ExperimentPersonKey fromDocumentIdentifier(String documentIdentifier,
                                                      IdentifierBridgeFromDocumentIdentifierContext context) {
        String[] propertyValueIds = documentIdentifier.split("_");
        ExperimentPersonKey experimentPersonKey = new ExperimentPersonKey();
        experimentPersonKey.setExperimentId(Long.parseLong(propertyValueIds[0]));
        experimentPersonKey.setExperimentId(Long.parseLong(propertyValueIds[1]));
        return experimentPersonKey;
    }
}
