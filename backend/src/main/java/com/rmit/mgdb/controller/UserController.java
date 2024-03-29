package com.rmit.mgdb.controller;

import com.rmit.mgdb.model.Person;
import com.rmit.mgdb.model.User;
import com.rmit.mgdb.payload.AuthenticationRequest;
import com.rmit.mgdb.payload.AuthenticationResponse;
import com.rmit.mgdb.payload.RegisterPayload;
import com.rmit.mgdb.payload.ResultsResponse;
import com.rmit.mgdb.security.JWTTokenProvider;
import com.rmit.mgdb.service.CustomUserDetailsService;
import com.rmit.mgdb.service.PersonService;
import com.rmit.mgdb.service.UserService;
import com.rmit.mgdb.service.ValidationErrorService;
import com.rmit.mgdb.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final PersonService personService;
    private final CustomUserDetailsService userDetailsService;
    private final UserValidator userValidator;
    private final ValidationErrorService validationErrorService;
    private final AuthenticationManager authenticationManager;
    private final JWTTokenProvider jwtTokenProvider;

    @Autowired
    public UserController(UserService userService,
                          PersonService personService,
                          CustomUserDetailsService userDetailsService,
                          UserValidator userValidator,
                          ValidationErrorService validationErrorService,
                          AuthenticationManager authenticationManager,
                          JWTTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.personService = personService;
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
    public ResponseEntity<?> register(@Valid @RequestBody RegisterPayload payload, BindingResult result) {
        // Only perform custom validation once the basic validations pass.
        User user = payload.getUser();
        Person person = payload.getPerson();
        if (!result.hasErrors())
            userValidator.validate(user, result);

        ResponseEntity<?> errorMap = validationErrorService.mapValidationErrors(result);
        if (errorMap != null)
            return errorMap;

        user = userService.saveUser(user);
        personService.savePerson(person);
        String jwt = jwtTokenProvider.createToken(userDetailsService.loadUserByUsername(user.getUsername()));
        return new ResponseEntity<>(new AuthenticationResponse(user, jwt), HttpStatus.CREATED);
    }

    /**
     * Register a new user.
     */
    @PostMapping("/register/basic")
    public ResponseEntity<?> registerBasic(@Valid @RequestBody User user, BindingResult result) {
        // Only perform custom validation once the basic validations pass.
        if (!result.hasErrors())
            userValidator.validate(user, result);

        ResponseEntity<?> errorMap = validationErrorService.mapValidationErrors(result);
        if (errorMap != null)
            return errorMap;

        user = userService.saveUser(user);
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

    /**
     * Get the currently authenticated user or the user from the request's authentication token.
     */
    @GetMapping("/authenticated")
    public ResponseEntity<?> getAuthenticated() {
        try {
            UserDetails userDetails =
                    (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return new ResponseEntity<>(userService.getUserByUsername(userDetails.getUsername()), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/paginated")
    public ResultsResponse<User> getUsers(@RequestParam Optional<Integer> page,
                                          @RequestParam Optional<Integer> size) {
        return userService.getUsers(page, size);
    }

    @PostMapping("/saveAll")
    public ResponseEntity<?> saveAllUsers(@RequestBody List<User> users) {
        userService.saveUsers(users);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
