package com.rmit.mgdb.validator;

import com.rmit.mgdb.model.User;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Implementation of the {@link Validator} for the {@link User} data model validation.
 */
@Component
public class UserValidator implements Validator {

    public static final int MINIMUM_PASSWORD_LENGTH = 6;

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    /**
     * Validates an {@link User} object.
     */
    @Override
    public void validate(Object object, Errors errors) {
        User user = (User) object;

        // Below are a few simple validations. Could always add/remove as necessary.
        if (user.getPassword().length() < MINIMUM_PASSWORD_LENGTH)
            errors.rejectValue("password", "Length",
                               String.format("Password must be at least %d characters.", MINIMUM_PASSWORD_LENGTH));

        if (user.getRole().equals(User.UserRole.ADMIN.string))
            errors.rejectValue("role", "Value", String.format("User role cannot be %s.", user.getRole()));
    }

}
