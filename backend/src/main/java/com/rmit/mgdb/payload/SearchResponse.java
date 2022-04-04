package com.rmit.mgdb.payload;

import java.util.List;

public class SearchResponse<T> {

    public long totalElements;
    public long totalPages;
    public long page;
    public long size;
    public List<T> results;

    public SearchResponse(long totalElements, long totalPages, long page, long size, List<T> results) {
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.page = page;
        this.size = size;
        this.results = results;
    }

}
