package com.rmit.mgdb.controller;

import com.rmit.mgdb.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class SearchController {

    private final SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam Map<String, String> params) {
        return new ResponseEntity<>(searchService.search(params), HttpStatus.OK);
    }

    @GetMapping("/search/advanced")
    public ResponseEntity<?> advancedSearch(@RequestParam Map<String, String> params) {
        return new ResponseEntity<>(searchService.advancedSearch(params), HttpStatus.OK);
    }

    @GetMapping("/search/users")
    public ResponseEntity<?> searchUsers(@RequestParam Map<String, String> params) {
        return new ResponseEntity<>(searchService.searchUsers(params), HttpStatus.OK);
    }

}
