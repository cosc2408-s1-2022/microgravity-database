package com.rmit.mgdb.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import static com.rmit.mgdb.util.Constants.DATE_FORMAT;

public class DateUtil {

    public static String format(Date date) {
        return new SimpleDateFormat(DATE_FORMAT).format(date);
    }

}
