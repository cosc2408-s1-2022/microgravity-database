package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.InvalidSearchCategoryException;
import com.rmit.mgdb.exception.InvalidSearchParamException;
import com.rmit.mgdb.model.Experiment;
import com.rmit.mgdb.payload.SearchResponse;
import com.rmit.mgdb.repository.CustomSearchQueryExecutor;
import org.apache.commons.lang3.EnumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Optional;

@Service
public class SearchService {

    private final CustomSearchQueryExecutor queryExecutor;

    @Autowired
    public SearchService(CustomSearchQueryExecutor queryExecutor) {
        this.queryExecutor = queryExecutor;
    }

    public SearchResponse<?> searchExperiments(Map<String, String> params, Optional<Integer> page, Optional<Integer> size) {
        for (String param : params.keySet())
            if (!EnumUtils.isValidEnumIgnoreCase(SearchParam.class, param))
                throw new InvalidSearchParamException(String.format("Unknown search param %s.", param));

        // TODO Safety guard in case frontend does not check for empty string.
        String stringParam = URLDecoder.decode(Optional.ofNullable(params.get(SearchParam.STRING.string)).orElseThrow(
                () -> new InvalidSearchParamException("Empty search string provided.")), StandardCharsets.UTF_8);

        String categoriesParam = params.get(SearchParam.CATEGORY.string);
        if (categoriesParam != null) {
            String[] categories =
                    URLDecoder.decode(categoriesParam, StandardCharsets.UTF_8).split("\\s");
            for (String category : categories)
                if (!EnumUtils.isValidEnumIgnoreCase(SearchCategory.class, category))
                    throw new InvalidSearchCategoryException(String.format("Unknown search category %s.", category));
        }

        // TODO Work in progress. Combine multiple result pages/improve on match sort accuracy.

        return queryExecutor.search(Experiment.class, stringParam, page, size);
    }

    public enum SearchParam {
        STRING("string"),
        CATEGORY("category"),
        START_DATE("startDate"),
        END_DATE("endDate");
        // TODO Additional search params as necessary.

        public final String string;

        SearchParam(String string) {
            this.string = string;
        }
    }

    public enum SearchCategory {
        EXPERIMENT("experiment"),
        MISSION("mission"),
        FOR_CODE("for_code"),
        SEO_CODE("seo_code"),
        PEOPLE("people"),
        ROLE("role");
        // TODO Additional search categories as necessary.

        public final String string;

        SearchCategory(String string) {
            this.string = string;
        }
    }

}
