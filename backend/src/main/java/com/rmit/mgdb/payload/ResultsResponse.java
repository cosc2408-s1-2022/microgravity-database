package com.rmit.mgdb.payload;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResultsResponse<T> {

    public long totalElements;
    public long totalPages;
    public long page;
    public long size;
    public List<T> results;

    public ResultsResponse(long totalElements, long totalPages, long page, long size, List<T> results) {
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.page = page;
        this.size = size;
        this.results = results;
    }

}
