package com.rmit.mgdb.security;

import java.util.concurrent.TimeUnit;

/**
 * Class to hold all the security configuration constants.
 */
public class SecurityConstants {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String JWT_ISSUER = "MGDB";
    public static final String JWT_SECRET_KEY = "MGDB_SECRET_KEY";
    public static final String JWT_SCHEME = "Bearer";
    public static final long JWT_EXPIRATION_TIME_MILLIS = TimeUnit.HOURS.toMillis(24);

}
