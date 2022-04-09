package com.rmit.mgdb.util;

public class SearchFieldConstants {

    public static final String[] SIMPLE_SEARCH_FIELDS = new String[]{
            "title",
            "toa",
            "leadInstitution",
            "mission.name",
            "mission.launchDateString",
            "mission.startDateString",
            "mission.endDateString",
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
            "people.person.country"
    };

    public static final String[] EXPERIMENT_SEARCH_FIELDS = new String[]{
            "title",
            "toa",
            "leadInstitution"
    };

    public static final String[] MISSION_SEARCH_FIELDS = new String[]{
            "name",
            "launchDateString",
            "startDateString",
            "endDateString"
    };

    public static final String[] FOR_CODE_SEARCH_FIELDS = new String[]{
            "code",
            "name"
    };

    public static final String[] SEO_CODE_SEARCH_FIELDS = new String[]{
            "code",
            "name"
    };

    public static final String[] DATE_RANGE_FIELDS = new String[]{
            "launchDate"
    };

}
