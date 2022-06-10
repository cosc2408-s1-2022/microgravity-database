package com.rmit.mgdb.util;

public class SearchFieldConstants {

    public static final String[] USER_SEARCH_FIELDS = new String[]{
            "username",
            "role"
    };

    public static final String[] EXPERIMENT_SEARCH_FIELDS = {
            "title",
            "leadInstitution",
            "mission.name",
            "mission.launchDateString",
            "mission.startDateString",
            "mission.endDateString",
            "platform.name",
            "experimentObjectives",
            "people.role.name",
            "people.person.firstName",
            "people.person.familyName",
            "people.person.affiliation",
            "people.person.city",
            "people.person.state",
            "people.person.country",
            "activity.name",
            "toa.name",
            "forCode.code",
            "forCode.name",
            "seoCode.code",
            "seoCode.name",
            "spacecraft",
            "subsystem.name",
            "payload",
            "area.name",
            "testSubjectType.name"
    };

    public static final String EXPERIMENT_PLATFORM_SEARCH_FIELD = "platform.name";

    public static final String EXPERIMENT_SORT_FIELD = "title_sort";

    public static final String[] MISSION_SEARCH_FIELDS = {
            "name",
            "launchDateString",
            "startDateString",
            "endDateString"
    };

    public static final String MISSION_PLATFORM_SEARCH_FIELD = "platform.name";

    public static final String MISSION_SORT_FIELD = "launchDate";

    public static final String[] FOR_CODE_SEARCH_FIELDS = {
            "code",
            "name"
    };

    public static final String FOR_CODE_PLATFORM_SEARCH_FIELD = "platforms.name";

    public static final String FOR_CODE_SORT_FIELD = "name_sort";

    public static final String[] SEO_CODE_SEARCH_FIELDS = {
            "code",
            "name"
    };

    public static final String SEO_CODE_PLATFORM_SEARCH_FIELD = "platforms.name";

    public static final String SEO_CODE_SORT_FIELD = "name_sort";

    public static final String DATE_RANGE_FIELDS = "launchDate";

    public static final String[] PERSON_SEARCH_FIELDS = {
            "firstName",
            "familyName",
            "affiliation",
            "city",
            "state",
            "country"
    };

}
