package com.rmit.mgdb.exception;

import com.rmit.mgdb.payload.*;
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
    public final ResponseEntity<?> handleUsernameNotFound(UsernameNotFoundException exception) {
        UsernameNotFoundResponse exceptionResponse =
                new UsernameNotFoundResponse(exception.getMessage(), exception.getUsername());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<?> handleInvalidSearchParam(InvalidSearchParamException exception) {
        InvalidSearchParamResponse exceptionResponse = new InvalidSearchParamResponse(exception.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<?> handleInvalidSearchCategory(InvalidResultTypeException exception) {
        InvalidResultTypeResponse exceptionResponse = new InvalidResultTypeResponse(exception.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<?> handleNotFound(NotFoundException exception) {
        NotFoundResponse exceptionResponse = new NotFoundResponse(exception.getMessage(), exception.getId());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<?> handleExperimentPersonAlreadyExists(
            ExperimentPersonAlreadyExistsException exception) {
        ExperimentPersonAlreadyExistsResponse exceptionResponse =
                new ExperimentPersonAlreadyExistsResponse(exception.getMessage(), exception.getExperimentId(),
                                                          exception.getPersonId(), exception.getRoleId());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<?> handleInvalidExperimentAttachment(InvalidExperimentAttachmentException exception) {
        InvalidExperimentAttachmentResponse exceptionResponse =
                new InvalidExperimentAttachmentResponse(exception.getMessage(), exception.getFilename());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

}
