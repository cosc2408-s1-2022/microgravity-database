package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.InvalidSearchParamException;
import com.rmit.mgdb.model.Experiment;
import com.rmit.mgdb.model.ForCode;
import com.rmit.mgdb.model.Mission;
import com.rmit.mgdb.model.SeoCode;
import com.rmit.mgdb.payload.SearchResponse;
import org.apache.commons.lang3.EnumUtils;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

import static com.rmit.mgdb.util.Constants.DEFAULT_PAGE_SIZE;
import static com.rmit.mgdb.util.SearchFieldConstants.*;

@Service
public class SearchService {

    @PersistenceContext
    private final EntityManager entityManager;
    private final SearchSession searchSession;

    @Autowired
    public SearchService(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.searchSession = Search.session(entityManager);
    }

    /**
     * Perform search based on the query params and return a paginated {@link SearchResponse}.
     * This is the simpler search method which only searches across experiments.
     */
    public SearchResponse<Experiment> search(Map<String, String> params) {
        validateParams(params);

        // Extract necessary params.
        String stringParam = extractStringParam(params, SearchParam.STRING.string);
        int page = extractIntegerParam(params, SearchParam.PAGE.string, 1);
        int size = extractIntegerParam(params, SearchParam.SIZE.string, DEFAULT_PAGE_SIZE);

        // Hibernate Search uses zero-based index.
        page--;

        SearchResult<Experiment> result = searchSession.search(Experiment.class)
                                                       .where(f -> f.match()
                                                                    .fields(SIMPLE_SEARCH_FIELDS)
                                                                    .matching(stringParam)

                                                             )
                                                       .fetch(page * size, size);

        long totalHitCount = result.total().hitCount();
        return new SearchResponse<>(
                totalHitCount, (long) Math.ceil((double) totalHitCount / size), page, size, result.hits());
    }

    /**
     * Perform search based on the query params and return a paginated {@link SearchResponse}.
     * This is the advanced search method which allows complex queries.
     */
    public SearchResponse<?> advancedSearch(Map<String, String> params) {
        validateParams(params);

        // Extract necessary params.
        String stringParam = extractStringParam(params, SearchParam.STRING.string, "");
        int page = extractIntegerParam(params, SearchParam.PAGE.string, 0);
        int size = extractIntegerParam(params, SearchParam.SIZE.string, DEFAULT_PAGE_SIZE);
        PlatformType platformParam = PlatformType.valueOf(
                extractStringParam(params, SearchParam.PLATFORM.string, PlatformType.SPACE_STATION.string));
        ResultType resultTypeParam = ResultType.valueOf(
                extractStringParam(params, SearchParam.RESULT_TYPE.string, ResultType.MISSION.string));
        Optional<Date> startDate = extractDateParam(params, SearchParam.START_DATE.string);
        Optional<Date> endDate = extractDateParam(params, SearchParam.END_DATE.string);

        return stringParam.isEmpty()
               ? advancedSearch(platformParam, resultTypeParam, page, size, startDate, endDate)
               : advancedSearch(stringParam, platformParam, resultTypeParam, page, size, startDate, endDate);
    }

    private SearchResponse<?> advancedSearch(PlatformType platformType, ResultType resultType, int page, int size,
                                             Optional<Date> startDate, Optional<Date> endDate) {
        SearchResult<?> result;
        if (startDate.isPresent() && endDate.isPresent()) {
            result = searchSession.search(resultType.associatedClass)
                                  .where(f -> f.bool()
                                               .must(f.match()
                                                      .field(resultType.platformSearchField)
                                                      .matching(platformType.string))
                                               .must(f.range().fields(DATE_RANGE_FIELDS)
                                                      .between(startDate.get(), endDate.get())))
                                  .fetch(page * size, size);
        } else if (startDate.isPresent()) {
            result = searchSession.search(resultType.associatedClass)
                                  .where(f -> f.bool()
                                               .must(f.match()
                                                      .field(resultType.platformSearchField)
                                                      .matching(platformType.string))
                                               .must(f.range()
                                                      .fields(DATE_RANGE_FIELDS)
                                                      .atLeast(startDate.get())))
                                  .fetch(page * size, size);
        } else if (endDate.isPresent()) {
            result = searchSession.search(resultType.associatedClass)
                                  .where(f -> f.bool()
                                               .must(f.match()
                                                      .field(resultType.platformSearchField)
                                                      .matching(platformType.string))
                                               .must(f.range().fields(DATE_RANGE_FIELDS)
                                                      .atMost(endDate.get())))
                                  .fetch(page * size, size);
        } else {
            result = searchSession.search(resultType.associatedClass)
                                  .where(f -> f.bool()
                                               .must(f.match()
                                                      .field(resultType.platformSearchField)
                                                      .matching(platformType.string)))
                                  .fetch(page * size, size);
        }


        long totalHitCount = result.total().hitCount();
        return new SearchResponse<>(
                totalHitCount, (long) Math.ceil((double) totalHitCount / size), page, size, result.hits());
    }

    private SearchResponse<?> advancedSearch(String string, PlatformType platformType, ResultType resultType, int page,
                                             int size, Optional<Date> startDate, Optional<Date> endDate) {
        SearchResult<?> result;
        if (startDate.isPresent() && endDate.isPresent()) {
            result = searchSession.search(resultType.associatedClass)
                                  .where(f -> f.bool()
                                               .must(f.match()
                                                      .field(resultType.platformSearchField)
                                                      .matching(platformType.string))
                                               .must(f.match()
                                                      .fields(MISSION_SEARCH_FIELDS)
                                                      .matching(string))
                                               .must(f.range().fields(DATE_RANGE_FIELDS)
                                                      .between(startDate.get(), endDate.get())))
                                  .fetch(page * size, size);


        } else if (startDate.isPresent()) {
            result = searchSession.search(resultType.associatedClass)
                                  .where(f -> f.bool()
                                               .must(f.match()
                                                      .field(resultType.platformSearchField)
                                                      .matching(platformType.string))
                                               .must(f.match()
                                                      .fields(MISSION_SEARCH_FIELDS)
                                                      .matching(string))
                                               .must(f.range().fields(DATE_RANGE_FIELDS)
                                                      .atLeast(startDate.get())))
                                  .fetch(page * size, size);
        } else if (endDate.isPresent()) {
            result = searchSession.search(resultType.associatedClass)
                                  .where(f -> f.bool()
                                               .must(f.match()
                                                      .field(resultType.platformSearchField)
                                                      .matching(platformType.string))
                                               .must(f.match()
                                                      .fields(MISSION_SEARCH_FIELDS)
                                                      .matching(string))
                                               .must(f.range().fields(DATE_RANGE_FIELDS)
                                                      .atMost(endDate.get())))
                                  .fetch(page * size, size);
        } else {
            result = searchSession.search(resultType.associatedClass)
                                  .where(f -> f.bool()
                                               .must(f.match()
                                                      .field(resultType.platformSearchField)
                                                      .matching(platformType.string))
                                               .must(f.match()
                                                      .fields(resultType.searchFields)
                                                      .matching(string)))
                                  .fetch(page * size, size);
        }


        long totalHitCount = result.total().hitCount();
        return new SearchResponse<>(
                totalHitCount, (long) Math.ceil((double) totalHitCount / size), page, size, result.hits());
    }

    /**
     * Utility method to validate search params.
     */
    private void validateParams(Map<String, String> params) {
        for (String param : params.keySet()) {
            if (!EnumUtils.isValidEnumIgnoreCase(SearchParam.class, param)) {
                throw new InvalidSearchParamException(String.format("Unknown search param \"%s\".", param));
            } else if (param.equals(SearchParam.RESULT_TYPE.string)) {
                if (!EnumUtils.isValidEnumIgnoreCase(ResultType.class, param))
                    throw new InvalidSearchParamException(String.format("Unknown result type \"%s\".", param));
            } else if (param.equals(SearchParam.PLATFORM.string)) {
                if (!EnumUtils.isValidEnumIgnoreCase(PlatformType.class, param))
                    throw new InvalidSearchParamException(String.format("Unknown platform type \"%s\".", param));
            }
        }
    }

    /**
     * Utility method to extract a string type search param.
     */
    private String extractStringParam(Map<String, String> params, String paramKey) {
        String paramValue = Optional.ofNullable(params.get(paramKey)).orElseThrow(() -> new InvalidSearchParamException(
                String.format("Required search param \"%s\" cannot be empty.", paramKey)));
        return URLDecoder.decode(paramValue, StandardCharsets.UTF_8);
    }

    /**
     * Utility method to extract a string type search param. Overload to support a default value.
     */
    private String extractStringParam(Map<String, String> params, String paramKey, String defaultValue) {
        String paramValue = Optional.ofNullable(params.get(paramKey)).orElse(defaultValue);
        return URLDecoder.decode(paramValue, StandardCharsets.UTF_8);
    }

    /**
     * Utility method to extract an integer type search param.
     */
    private int extractIntegerParam(Map<String, String> params, String paramKey, int defaultValue) {
        String paramValue = params.get(paramKey);
        if (paramValue == null || paramValue.isEmpty()) {
            return defaultValue;
        } else {
            try {
                return Integer.parseInt(paramValue);
            } catch (NumberFormatException exception) {
                throw new InvalidSearchParamException(
                        String.format("Non-numeric value received for search param \"%s\"", paramValue));
            }
        }
    }

    /**
     * Utility method to extract an integer type search param.
     */
    private Optional<Date> extractDateParam(Map<String, String> params, String paramKey) {
        String paramValue = params.get(paramKey);
        if (paramValue == null || paramValue.isEmpty()) {
            return Optional.empty();
        } else {
            try {
                return Optional.of(new SimpleDateFormat("yyyy").parse(paramValue));
            } catch (ParseException e) {
                throw new InvalidSearchParamException(
                        String.format("Invalid value for date param \"%s\"", paramValue));
            }
        }
    }

    /**
     * Possible search params.
     */
    public enum SearchParam {
        STRING("string"),
        PLATFORM("platform"),
        RESULT_TYPE("resultType"),
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
     * Possible search result types.
     */
    public enum ResultType {
        EXPERIMENT("experiment", Experiment.class, EXPERIMENT_SEARCH_FIELDS, EXPERIMENT_PLATFORM_SEARCH_FIELD),
        MISSION("mission", Mission.class, MISSION_SEARCH_FIELDS, MISSION_PLATFORM_SEARCH_FIELD),
        FOR_CODE("forCode", ForCode.class, FOR_CODE_SEARCH_FIELDS, FOR_CODE_PLATFORM_SEARCH_FIELD),
        SEO_CODE("seoCode", SeoCode.class, SEO_CODE_SEARCH_FIELDS, SEO_CODE_PLATFORM_SEARCH_FIELD);
        // TODO Additional result types as necessary.

        public final String string;
        public final Class<?> associatedClass;
        public final String[] searchFields;
        public final String platformSearchField;

        ResultType(String string, Class<?> associatedClass, String[] searchFields, String platformSearchField) {
            this.string = string;
            this.associatedClass = associatedClass;
            this.searchFields = searchFields;
            this.platformSearchField = platformSearchField;
        }
    }

    /**
     * Types of platforms/facilities.
     */
    public enum PlatformType {
        SPACE_STATION("spaceStation"),
        SPACE_SHUTTLE("spaceShuttle"),
        RETRIEVABLE_CAPSULE("retrievableCapsule"),
        SOUNDING_ROCKET("soundingRocket"),
        PARABOLIC_FLIGHT("parabolicFlight"),
        GROUND_BASED_FACILITY("groundBasedFacility");

        public final String string;

        PlatformType(String string) {
            this.string = string;
        }
    }

}
