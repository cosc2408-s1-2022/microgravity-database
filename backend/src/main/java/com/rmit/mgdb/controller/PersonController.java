package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.Person;
import com.rmit.mgdb.payload.ResultsResponse;
import com.rmit.mgdb.service.PersonService;
import com.rmit.mgdb.service.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/people")
public class PersonController {

    private final PersonService personService;
    private final ValidationErrorService validationErrorService;

    @Autowired
    public PersonController(PersonService personService,
                            ValidationErrorService validationErrorService) {
        this.personService = personService;
        this.validationErrorService = validationErrorService;
    }

    @GetMapping
    public List<Person> getAll() {
        return personService.getAllPeople();
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@Valid @RequestBody Person person, BindingResult result) {
        ResponseEntity<?> errorMap = validationErrorService.mapValidationErrors(result);
        if (errorMap != null)
            return errorMap;

        return new ResponseEntity<>(personService.savePerson(person), HttpStatus.CREATED);
    }

    @GetMapping("/paginated")
    public ResultsResponse<Person> getPeople(@RequestParam Optional<Integer> page,
                                             @RequestParam Optional<Integer> size) {
        return personService.getPeople(page, size);
    }

    @PostMapping("/{id}/toggleDelete")
    public void toggleDeleteById(@PathVariable Long id) {
        personService.toggleMissionDelete(id);
    }

    @PostMapping("/{id}/approve")
    public void approveById(@PathVariable Long id) {
        personService.approveMission(id);
    }

}
