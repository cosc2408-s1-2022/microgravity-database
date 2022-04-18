package com.rmit.mgdb.security;

import java.util.concurrent.TimeUnit;

/**
 * Class to hold all the security configuration constants.
 */
public class SecurityConstants {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    // TODO Secret key may need to be updated in the future. This is only for development.
    public static final String JWT_SECRET_KEY = "e9HA8$cWWePLdh*Di7Yr*28WG38b34ok!4C^6d!6a*VomZ6nwt*fsn9C@X@S^Gu^";
    public static final String JWT_SCHEME = "Bearer";
    public static final long JWT_EXPIRATION_TIME_MILLIS = TimeUnit.HOURS.toMillis(24);

}
