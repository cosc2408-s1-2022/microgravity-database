package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.Person;
import com.rmit.mgdb.repository.PersonRepository;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
public class PersonService {

    @PersistenceContext
    private final EntityManager entityManager;
    private final SearchSession searchSession;

    private final PersonRepository personRepository;

    @Autowired
    public PersonService(EntityManager entityManager, PersonRepository personRepository) {
        this.entityManager = entityManager;
        this.personRepository = personRepository;
        this.searchSession = Search.session(entityManager);
    }

    public List<Person> getAllPeople() {
        return personRepository.findAll();
    }

    public Person getPersonById(Long id) {
        return personRepository.findById(id)
                               .orElseThrow(() -> new NotFoundException("Person could not be found.", id));
    }

    public Person addPerson(Person person) {
        person = personRepository.saveAndFlush(person);
        searchSession.massIndexer().start();
        return person;
    }

}
