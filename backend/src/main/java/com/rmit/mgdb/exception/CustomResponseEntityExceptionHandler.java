package com.rmit.mgdb.exception;

import com.rmit.mgdb.payload.InvalidSearchCategoryResponse;
import com.rmit.mgdb.payload.InvalidSearchParamResponse;
import com.rmit.mgdb.payload.UserNotFoundResponse;
import com.rmit.mgdb.payload.UsernameAlreadyExistsResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Controller advice to handle specific exceptions and send custom responses.
 */
@ControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<?> handleUsernameAlreadyExists(UsernameAlreadyExistsException exception) {
        UsernameAlreadyExistsResponse exceptionResponse = new UsernameAlreadyExistsResponse(exception.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<?> handleInvalidSearchParam(InvalidSearchParamException exception) {
        InvalidSearchParamResponse exceptionResponse = new InvalidSearchParamResponse(exception.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<?> handleUserNotFound(UserNotFoundException exception) {
        UserNotFoundResponse exceptionResponse = new UserNotFoundResponse(exception.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }
      
    @ExceptionHandler
    public final ResponseEntity<?> handleInvalidSearchCategory(InvalidSearchCategoryException exception) {
        InvalidSearchCategoryResponse exceptionResponse = new InvalidSearchCategoryResponse(exception.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

}
