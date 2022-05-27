package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.NotFoundException;
import com.rmit.mgdb.model.TestSubjectType;
import com.rmit.mgdb.repository.TestSubjectTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestSubjectTypeService {

    private final TestSubjectTypeRepository testSubjectTypeRepository;

    @Autowired
    public TestSubjectTypeService(TestSubjectTypeRepository testSubjectTypeRepository) {
        this.testSubjectTypeRepository = testSubjectTypeRepository;
    }

    public List<TestSubjectType> getAllTestSubjectTypes() {
        return testSubjectTypeRepository.findAll();
    }

    public TestSubjectType getTestSubjectTypeById(Long id) {
        return testSubjectTypeRepository.findById(id)
                                        .orElseThrow(
                                                () -> new NotFoundException("Test subject type could not be found.",
                                                                            id));
    }

}
