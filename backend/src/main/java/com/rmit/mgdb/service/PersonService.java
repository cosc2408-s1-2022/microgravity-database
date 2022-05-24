package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.Person;
import com.rmit.mgdb.payload.ResultsResponse;
import com.rmit.mgdb.repository.PersonRepository;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

import static com.rmit.mgdb.util.Constants.DEFAULT_PAGE_SIZE;

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

    public Person savePerson(Person person) {
        person = personRepository.saveAndFlush(person);
        searchSession.massIndexer().start();
        return person;
    }

    public ResultsResponse<Person> getPeople(Optional<Integer> page, Optional<Integer> size) {
        Page<Person> people;
        if (page.isPresent() || size.isPresent()) {
            int pageInt = page.orElse(1) - 1;
            int sizeInt = size.orElse(DEFAULT_PAGE_SIZE);
            people =
                    personRepository.findPeopleBy(PageRequest.of(pageInt, sizeInt));
            return new ResultsResponse<>(people.getTotalElements(), people.getTotalPages(), pageInt + 1,
                                         sizeInt,
                                         people.getContent());
        } else {
            people =
                    personRepository.findPeopleBy(Pageable.ofSize(DEFAULT_PAGE_SIZE));
            return new ResultsResponse<>(people.getTotalElements(), people.getTotalPages(),
                                         people.getTotalPages() + 1,
                                         DEFAULT_PAGE_SIZE, people.getContent());
        }
    }

    public void toggleMissionDelete(Long id) {
        Person person = getPersonById(id);
        person.setDeleted(!person.isDeleted());
        personRepository.saveAndFlush(person);
        searchSession.massIndexer().start();
    }

    public void approveMission(Long id) {
        Person person = getPersonById(id);
        person.setApproved(true);
        personRepository.saveAndFlush(person);
        searchSession.massIndexer().start();
    }

}
