package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.InvalidSearchCategoryException;
import com.rmit.mgdb.exception.InvalidSearchParamException;
import com.rmit.mgdb.model.*;
import com.rmit.mgdb.payload.SearchResponse;
import com.rmit.mgdb.repository.CustomSearchQueryExecutor;
import org.apache.commons.lang3.EnumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

import static com.rmit.mgdb.util.Constants.DEFAULT_PAGE_SIZE;

@Service
public class SearchService {

    private final CustomSearchQueryExecutor queryExecutor;

    @Autowired
    public SearchService(CustomSearchQueryExecutor queryExecutor) {
        this.queryExecutor = queryExecutor;
    }

    /**
     * Perform search based on the query params and return a paginated {@link SearchResponse}.
     */
    public SearchResponse<?> search(Map<String, String> params, Optional<Integer> page, Optional<Integer> size) {
        // Validate search params.
        for (String param : params.keySet())
            if (!EnumUtils.isValidEnumIgnoreCase(SearchParam.class, param))
                throw new InvalidSearchParamException(String.format("Unknown search param %s.", param));

        // Decode the search string param.
        String stringParam = URLDecoder.decode(
                // Safety guard in case frontend does not check for empty string.
                Optional.ofNullable(params.get(SearchParam.STRING.string)).orElseThrow(
                        () -> new InvalidSearchParamException("Empty search string provided.")),
                StandardCharsets.UTF_8);

        SearchResponse<Object> searchResponse = new SearchResponse<>(0, 0, 0, DEFAULT_PAGE_SIZE, new ArrayList<>());
        String categoriesParam = params.get(SearchParam.CATEGORIES.string);
        if (categoriesParam != null) {
            // Decode the categories param.
            String[] categories = URLDecoder.decode(categoriesParam, StandardCharsets.UTF_8).split("\\s");

            // Search for each category and append to the search response.
            for (String category : categories) {
                try {
                    searchResponse = searchByCategory(searchResponse, category, stringParam);
                } catch (Exception exception) {
                    throw new InvalidSearchCategoryException(String.format("Unknown search category %s.", category));
                }
            }
        } else {
            // If no category param specified, search across all categories.
            for (SearchCategory searchCategory : SearchCategory.values()) {
                try {
                    searchResponse = searchByCategory(searchResponse, searchCategory.string, stringParam);
                } catch (Exception ignore) {
                    // Never thrown.
                }
            }
        }

        // TODO Filter by date.

        // Paginate all the results.
        searchResponse.page = (long) (page.orElse(0));
        searchResponse.size = (long) (size.orElse(DEFAULT_PAGE_SIZE));

        // Negate one to get "programmer" index.
        if (searchResponse.page != 0)
            searchResponse.page -= 1;
        searchResponse.results = searchResponse.results.stream()
                                                       .skip(searchResponse.page * searchResponse.size)
                                                       .limit(searchResponse.size)
                                                       .collect(Collectors.toList());

        // Prevent "programmer" index.
        searchResponse.page += 1;
        searchResponse.totalPages += 1;
        return searchResponse;
    }

    /**
     * Search across categories and append to an existing {@link SearchResponse}.
     */
    public SearchResponse<Object> searchByCategory(SearchResponse<Object> searchResponse, String category,
                                                   String stringParam) throws ClassNotFoundException {
        // Get the category enum for the string value of the category.
        SearchCategory categoryEnum = Arrays.stream(SearchCategory.values())
                                            .filter(c -> c.string.equals(category.toLowerCase(Locale.ROOT))).findAny()
                                            .orElseThrow();

        // Get the associated entity class with the category.
        Class<?> c = Class.forName(categoryEnum.associatedClassName);
        SearchResponse<?> categorySearchResponse =
                queryExecutor.search(c, stringParam, Optional.empty(), Optional.empty());

        // Append to the search response.
        searchResponse.totalItems += categorySearchResponse.totalItems;
        searchResponse.totalPages += categorySearchResponse.totalPages;
        searchResponse.results.addAll(categorySearchResponse.results);
        return searchResponse;
    }

    /**
     * Possible search params.
     */
    public enum SearchParam {
        STRING("string"),
        CATEGORIES("categories"),
        PAGE("page"),
        SIZE("size"),
        START_DATE("startDate"),
        END_DATE("endDate");
        // TODO Additional search params as necessary.

        public final String string;

        SearchParam(String string) {
            this.string = string;
        }
    }

    /**
     * Possible search categories.
     */
    public enum SearchCategory {
        EXPERIMENT("experiment", Experiment.class.getName()),
        MISSION("mission", Mission.class.getName()),
        FOR_CODE("forCode", ForCode.class.getName()),
        SEO_CODE("seoCode", SeoCode.class.getName()),
        PEOPLE("people", People.class.getName()),
        ROLE("role", Role.class.getName());
        // TODO Additional search categories as necessary.

        public final String string;
        public final String associatedClassName;

        SearchCategory(String string, String associatedClassName) {
            this.string = string;
            this.associatedClassName = associatedClassName;
        }
    }

}
