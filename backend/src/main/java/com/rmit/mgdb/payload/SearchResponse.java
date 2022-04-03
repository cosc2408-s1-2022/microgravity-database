package com.rmit.mgdb.payload;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SearchResponse<T> {

    private long totalItems;
    private long totalPages;
    private long currentPage;
    private List<T> results;

    public SearchResponse(long totalItems, long totalPages, long currentPage, List<T> results) {
        this.totalItems = totalItems;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.results = results;
    }

}
