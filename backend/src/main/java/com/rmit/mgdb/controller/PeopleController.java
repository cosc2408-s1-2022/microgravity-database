package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.Person;
import com.rmit.mgdb.service.PersonService;
import com.rmit.mgdb.service.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/people")
public class PeopleController {

    private final PersonService personService;
    private final ValidationErrorService validationErrorService;

    @Autowired
    public PeopleController(PersonService personService,
                            ValidationErrorService validationErrorService) {
        this.personService = personService;
        this.validationErrorService = validationErrorService;
    }

    @GetMapping("/all")
    public List<Person> getAll() {
        return personService.getAllPeople();
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@Valid @RequestBody Person person, BindingResult result) {
        ResponseEntity<?> errorMap = validationErrorService.mapValidationErrors(result);
        if (errorMap != null)
            return errorMap;

        return new ResponseEntity<>(personService.addPerson(person), HttpStatus.CREATED);
    }


}
