package com.justcallmesam.webutils.exception;

import com.justcallmesam.webutils.model.WebUtilsError;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
public class WebUtilsExceptionHandler {

    @ExceptionHandler(WebUtilsException.class)
    public ResponseEntity<Object> handleWebUtilsException(WebUtilsException ex) {
        return new ResponseEntity<>(ex.getWebUtilsError(), ex.getWebUtilsError().getErrorStatus());
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpServletRequest request) {

        WebUtilsError webUtilsError = WebUtilsError.builder()
                .requestedService(request.getServletPath())
                .exception(ex.getClass().getSimpleName())
                .errorMessage(ex.getMessage())
                .errorStatus(HttpStatus.NOT_FOUND)
                .build();

        return new ResponseEntity<>(webUtilsError, webUtilsError.getErrorStatus());
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Object> handleNoResourceFoundException(NoResourceFoundException ex, HttpServletRequest request) {

        WebUtilsError webUtilsError = WebUtilsError.builder()
                .requestedService(request.getServletPath())
                .exception(ex.getClass().getSimpleName())
                .errorMessage(ex.getMessage())
                .build();

        return new ResponseEntity<>(webUtilsError, webUtilsError.getErrorStatus());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception ex, HttpServletRequest request) {

        WebUtilsError webUtilsError = WebUtilsError.builder()
                .requestedService(request.getServletPath())
                .exception(ex.getClass().getSimpleName())
                .errorMessage(ex.getMessage())
                .build();

        return new ResponseEntity<>(webUtilsError, webUtilsError.getErrorStatus());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleRuntimeException(RuntimeException ex, HttpServletRequest request) {

        WebUtilsError webUtilsError = WebUtilsError.builder()
                .requestedService(request.getServletPath())
                .exception(ex.getClass().getSimpleName())
                .errorMessage(ex.getMessage())
                .build();

        return new ResponseEntity<>(webUtilsError, webUtilsError.getErrorStatus());
    }
}