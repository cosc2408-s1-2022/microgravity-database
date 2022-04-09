package com.rmit.mgdb.service;

import com.rmit.mgdb.exception.InvalidSearchParamException;
import com.rmit.mgdb.model.*;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

import static com.rmit.mgdb.util.Constants.DEFAULT_PAGE_SIZE;

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
        int page = extractIntegerParam(params, SearchParam.PAGE.string, 0);
        int size = extractIntegerParam(params, SearchParam.SIZE.string, DEFAULT_PAGE_SIZE);

        // JPA pagination uses zero-based index.
        if (page != 0)
            page--;

        SearchResult<Experiment> result = searchSession.search(Experiment.class)
                                                       .where(f -> f.match()
                                                                    .fields("title",
                                                                            "toa",
                                                                            "leadInstitution",
                                                                            "mission.name",
                                                                            "platform.name",
                                                                            "forCode.code",
                                                                            "forCode.name",
                                                                            "seoCode.code",
                                                                            "seoCode.name",
                                                                            "people.role.name",
                                                                            "people.person.firstName",
                                                                            "people.person.familyName",
                                                                            "people.person.affiliation",
                                                                            "people.person.city",
                                                                            "people.person.state",
                                                                            "people.person.country")
                                                                    .matching(stringParam)

                                                             )
                                                       .fetch(page * size, size);

        long totalHitCount = result.total().hitCount();
        return new SearchResponse<>(totalHitCount, (long) Math.ceil((double) totalHitCount / size), page + 1, size,
                                    result.hits());
    }

    /**
     * Perform search based on the query params and return a paginated {@link SearchResponse}.
     * This is the advanced search method which allows complex queries.
     */
    public SearchResponse<?> advancedSearch(Map<String, String> params) {
        validateParams(params);

        SearchResponse<Object> searchResponse = new SearchResponse<>(0, 0, 0, DEFAULT_PAGE_SIZE, new ArrayList<>());

        // Extract necessary params.
        String stringParam = extractStringParam(params, SearchParam.STRING.string, "");
        int page = extractIntegerParam(params, SearchParam.PAGE.string, 0);
        int size = extractIntegerParam(params, SearchParam.SIZE.string, DEFAULT_PAGE_SIZE);
        PlatformType platformParam = PlatformType.valueOf(
                extractStringParam(params, SearchParam.PLATFORM.string, PlatformType.SPACE_STATION.string));
        ResultType resultTypeParam = ResultType.valueOf(
                extractStringParam(params, SearchParam.RESULT_TYPE.string, ResultType.MISSION.string));

        // TODO Actual search logic to be implemented.



        return searchResponse;
    }

    /**
     * Utility method to validate search params.
     */
    private void validateParams(Map<String, String> params) {
        for (String param : params.keySet())
            if (!EnumUtils.isValidEnumIgnoreCase(SearchParam.class, param))
                throw new InvalidSearchParamException(String.format("Unknown search param \"%s\".", param));
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
        EXPERIMENT("experiment", Experiment.class.getName()),
        MISSION("mission", Mission.class.getName()),
        FOR_CODE("forCode", ForCode.class.getName()),
        SEO_CODE("seoCode", SeoCode.class.getName()),

        // FIXME The following categories might be unnecessary.
        PEOPLE("people", Person.class.getName()),
        ROLE("role", Role.class.getName());
        // TODO Additional search categories as necessary.

        public final String string;
        public final String associatedClassName;

        ResultType(String string, String associatedClassName) {
            this.string = string;
            this.associatedClassName = associatedClassName;
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
