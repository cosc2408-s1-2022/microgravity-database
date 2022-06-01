package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.InvalidSearchParamException;
import com.rmit.mgdb.model.*;
import com.rmit.mgdb.payload.ResultsResponse;
import org.hibernate.search.engine.search.predicate.SearchPredicate;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoField;
import java.util.Arrays;
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
     * Perform search based on the query params and return a paginated {@link ResultsResponse}.
     * This is the simpler search method which only searches across experiments.
     */
    public ResultsResponse<Experiment> search(Map<String, String> params) {
        return searchEntity(params, Experiment.class, EXPERIMENT_SEARCH_FIELDS);
    }

    public ResultsResponse<User> searchUsers(Map<String, String> params) {
        return searchEntity(params, User.class, USER_SEARCH_FIELDS);
    }

    public ResultsResponse<Mission> searchMissions(Map<String, String> params) {
        return searchEntity(params, Mission.class, MISSION_SEARCH_FIELDS);
    }

    public ResultsResponse<Person> searchPeople(Map<String, String> params) {
        return searchEntity(params, Person.class, PERSON_SEARCH_FIELDS);
    }

    private <T> ResultsResponse<T> searchEntity(Map<String, String> params, Class<T> tClass, String[] fields) {
        validateParams(params);

        // Extract necessary params.
        String stringParam = extractStringParam(params, SearchParam.STRING.string);
        int page = extractIntegerParam(params, SearchParam.PAGE.string, 1);
        int size = extractIntegerParam(params, SearchParam.SIZE.string, DEFAULT_PAGE_SIZE);

        // Hibernate Search uses zero-based index.
        page--;

        SearchResult<T> result;
        if (tClass.equals(Experiment.class)) {
            result = searchSession.search(tClass)
                                  .where(s -> s.bool().must(m -> m.match()
                                                                  .fields(fields)
                                                                  .matching(stringParam))
                                               .must(m -> m.match().field("approved").matching(true))
                                               .must(m -> m.match().field("deleted").matching(false))
                                               .must(m -> m.match().field("mission.approved").matching(true))
                                               .must(m -> m.match().field("mission.deleted").matching(false))
                                               .must(m -> m.match().field("people.person.approved").matching(true))
                                               .must(m -> m.match().field("people.person.deleted").matching(false)))
                                  .fetch(page * size, size);
        } else {
            result = searchSession.search(tClass)
                                  .where(s -> s.match()
                                               .fields(fields)
                                               .matching(stringParam)

                                        )
                                  .fetch(page * size, size);
        }

        long totalHitCount = result.total().hitCount();
        return new ResultsResponse<>(
                totalHitCount, (long) Math.ceil((double) totalHitCount / size), page + 1, size, result.hits());
    }

    /**
     * Perform search based on the query params and return a paginated {@link ResultsResponse}.
     * This is the advanced search method which allows complex queries.
     */
    public ResultsResponse<?> advancedSearch(Map<String, String> params) {
        validateParams(params);

        // Extract necessary params.
        String stringParam = extractStringParam(params, SearchParam.STRING.string, "");
        int page = extractIntegerParam(params, SearchParam.PAGE.string, 1);
        int size = extractIntegerParam(params, SearchParam.SIZE.string, DEFAULT_PAGE_SIZE);
        String platformParam =
                extractStringParam(params, SearchParam.PLATFORM.string, PlatformType.SPACE_STATION.string);
        ResultType resultTypeParam = Arrays.stream(ResultType.values())
                                           .filter(v -> v.string.equals(extractStringParam(params,
                                                                                           SearchParam.RESULT_TYPE.string,
                                                                                           ResultType.EXPERIMENT.string)))
                                           .findFirst()
                                           .orElse(ResultType.EXPERIMENT);
        Optional<LocalDate> startDate = extractDateParam(params, SearchParam.START_DATE.string);
        Optional<LocalDate> endDate = extractDateParam(params, SearchParam.END_DATE.string);

        // Hibernate Search uses zero-based index.
        page--;

        // Hibernate Search predicate creation.
        SearchPredicate searchPredicate = searchSession.scope(resultTypeParam.associatedClass)
                                                       .predicate()
                                                       .bool(b -> {
                                                           // Must match platform type.
                                                           b.must(s -> s.match()
                                                                        .field(resultTypeParam.platformSearchField)
                                                                        .matching(platformParam));

                                                           // Must match string if present.
                                                           if (!stringParam.isEmpty()) {
                                                               b.must(s -> s.match()
                                                                            .fields(resultTypeParam.searchFields)
                                                                            .matching(stringParam));
                                                           }

                                                           if (resultTypeParam == ResultType.EXPERIMENT ||
                                                               resultTypeParam == ResultType.MISSION) {
                                                               b.must(s -> s.match().field("approved").matching(true));
                                                               b.must(s -> s.match().field("deleted").matching(false));
                                                           }

                                                           if (resultTypeParam == ResultType.EXPERIMENT) {
                                                               b.must(s -> s.match().field("mission.approved")
                                                                            .matching(true));
                                                               b.must(s -> s.match().field("mission.deleted")
                                                                            .matching(false));
                                                               b.must(s -> s.match().field("people.person.approved")
                                                                            .matching(true));
                                                               b.must(s -> s.match().field("people.person.deleted")
                                                                            .matching(false));
                                                           }

                                                           // Date range filters.
                                                           // Only allow missions to be filtered.
                                                           if (resultTypeParam == ResultType.MISSION) {
                                                               if (startDate.isPresent() && endDate.isPresent()) {
                                                                   b.must(s -> s.range()
                                                                                .field(DATE_RANGE_FIELDS)
                                                                                .between(startDate.get(),
                                                                                         endDate.get()));
                                                               } else if (startDate.isPresent()) {
                                                                   b.must(s -> s.range()
                                                                                .field(DATE_RANGE_FIELDS)
                                                                                .atLeast(startDate.get()));
                                                               } else {
                                                                   endDate.ifPresent(date -> b.must(
                                                                           s -> s.range()
                                                                                 .field(DATE_RANGE_FIELDS)
                                                                                 .atMost(date)));
                                                               }
                                                           }
                                                       })
                                                       .toPredicate();

        // Perform search.
        SearchResult<?> result = searchSession.search(resultTypeParam.associatedClass)
                                              .where(searchPredicate)
                                              .fetch(page * size, size);

        long totalHitCount = result.total().hitCount();
        return new ResultsResponse<>(
                totalHitCount, (long) Math.ceil((double) totalHitCount / size), page + 1, size, result.hits());
    }

    /**
     * Utility method to validate search params.
     */
    private void validateParams(Map<String, String> params) {
        for (String paramKey : params.keySet()) {
            if (!SearchParam.isValidSearchParam(paramKey)) {
                throw new InvalidSearchParamException(String.format("Unknown search param '%s'.", paramKey));
            } else if (paramKey.equals(SearchParam.RESULT_TYPE.string)) {
                String paramValue = params.get(paramKey);
                if (!ResultType.isValidResultType(paramValue))
                    throw new InvalidSearchParamException(String.format("Unknown result type '%s'.", paramValue));
            } else if (paramKey.equals(SearchParam.PLATFORM.string)) {
                String paramValue = params.get(paramKey);
                if (!PlatformType.isValidPlatformType(paramValue))
                    throw new InvalidSearchParamException(String.format("Unknown platform type '%s'.", paramValue));
            }
        }
    }

    /**
     * Utility method to extract a string type search param.
     */
    private String extractStringParam(Map<String, String> params, String paramKey) {
        String paramValue = Optional.ofNullable(params.get(paramKey)).orElseThrow(() -> new InvalidSearchParamException(
                String.format("Required search param '%s' cannot be empty.", paramKey)));
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
                        String.format("Non-numeric value received for search param '%s'", paramValue));
            }
        }
    }

    /**
     * Utility method to extract an integer type search param.
     */
    private Optional<LocalDate> extractDateParam(Map<String, String> params, String paramKey) {
        String paramValue = params.get(paramKey);
        if (paramValue == null || paramValue.isEmpty()) {
            return Optional.empty();
        } else {
            try {
                DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                        .appendPattern("yyyy-MM-dd")
                        .toFormatter();
                return Optional.of(LocalDate.parse(paramValue, formatter));
            } catch (DateTimeParseException e) {
                throw new InvalidSearchParamException(
                        String.format("Invalid value for date param '%s'", paramValue));
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

        public static boolean isValidSearchParam(String param) {
            return Arrays.stream(SearchParam.values()).anyMatch(v -> v.string.equals(param));
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

        public static boolean isValidResultType(String type) {
            return Arrays.stream(ResultType.values()).anyMatch(v -> v.string.equals(type));
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

        public static boolean isValidPlatformType(String type) {
            return Arrays.stream(PlatformType.values()).anyMatch(v -> v.string.equals(type));
        }
    }

}
