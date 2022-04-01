package com.rmit.mgdb.controller;

import com.rmit.mgdb.exception.UsernameAlreadyExistsException;
import com.rmit.mgdb.model.User;
import com.rmit.mgdb.payload.AuthenticationRequest;
import com.rmit.mgdb.payload.AuthenticationResponse;
import com.rmit.mgdb.security.JWTTokenProvider;
import com.rmit.mgdb.service.CustomUserDetailsService;
import com.rmit.mgdb.service.UserService;
import com.rmit.mgdb.service.ValidationErrorService;
import com.rmit.mgdb.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final CustomUserDetailsService userDetailsService;
    private final UserValidator userValidator;
    private final ValidationErrorService validationErrorService;
    private final AuthenticationManager authenticationManager;
    private final JWTTokenProvider jwtTokenProvider;

    @Autowired
    public UserController(UserService userService,
                          CustomUserDetailsService userDetailsService,
                          UserValidator userValidator,
                          ValidationErrorService validationErrorService,
                          AuthenticationManager authenticationManager,
                          JWTTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.userDetailsService = userDetailsService;
        this.userValidator = userValidator;
        this.validationErrorService = validationErrorService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * Register a new user.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        // Only perform custom validation once the basic validations pass.
        if (!result.hasErrors())
            userValidator.validate(user, result);

        ResponseEntity<?> errorMap = validationErrorService.mapValidationErrors(result);
        if (errorMap != null)
            return errorMap;

        try {
            user = userService.saveUser(user);
        } catch (Exception exception) {
            // FIXME Dodgy way to determine unique constraint violation.
            if (exception.getMessage().contains("UK"))
                throw new UsernameAlreadyExistsException(
                        String.format("User by username %s already exists.", user.getUsername()));
            else
                // Rethrow to let Spring handle the exception.
                throw exception;
        }

        String jwt = jwtTokenProvider.createToken(userDetailsService.loadUserByUsername(user.getUsername()));
        return new ResponseEntity<>(new AuthenticationResponse(user, jwt), HttpStatus.CREATED);
    }


    /**
     * Login an existing user.
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthenticationRequest authenticationRequest,
                                              BindingResult result) {
        ResponseEntity<?> errorMap = validationErrorService.mapValidationErrors(result);
        if (errorMap != null)
            return errorMap;

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationRequest.getUsername(),
                authenticationRequest.getPassword()
        ));

        String jwt = jwtTokenProvider.createToken(
                userDetailsService.loadUserByUsername(authenticationRequest.getUsername()));
        return new ResponseEntity<>(new AuthenticationResponse(
                userService.getUserByUsername(authenticationRequest.getUsername()), jwt), HttpStatus.OK);
    }

}
