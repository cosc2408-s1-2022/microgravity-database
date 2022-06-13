package com.rmit.mgdb.config;

import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.massindexing.MassIndexer;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Component
public class HibernateSearchIndexBuilder implements CommandLineRunner {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public HibernateSearchIndexBuilder(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void run(String... args) {
        SearchSession searchSession = Search.session(entityManager);
        MassIndexer indexer = searchSession.massIndexer()
                                           .idFetchSize(150)
                                           .batchSizeToLoadObjects(25)
                                           .threadsToLoadObjects(12);

        try {
            indexer.startAndWait();
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
        }
    }
}
