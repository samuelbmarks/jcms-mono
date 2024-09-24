package com.justcallmesam.jcmsapi.exception;

import com.justcallmesam.jcmsapi.model.JcmsApiError;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
public class JcmsApiExceptionHandler {

    @ExceptionHandler(JcmsApiException.class)
    public ResponseEntity<Object> handleWebUtilsException(JcmsApiException ex) {
        return new ResponseEntity<>(ex.getJcmsApiError(), ex.getJcmsApiError().getErrorStatus());
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpServletRequest request) {

        JcmsApiError jcmsApiError = JcmsApiError.builder()
                .requestedService(request.getServletPath())
                .exception(ex.getClass().getSimpleName())
                .errorMessage(ex.getMessage())
                .errorStatus(HttpStatus.NOT_FOUND)
                .build();

        return new ResponseEntity<>(jcmsApiError, jcmsApiError.getErrorStatus());
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Object> handleNoResourceFoundException(NoResourceFoundException ex, HttpServletRequest request) {

        JcmsApiError jcmsApiError = JcmsApiError.builder()
                .requestedService(request.getServletPath())
                .exception(ex.getClass().getSimpleName())
                .errorMessage(ex.getMessage())
                .build();

        return new ResponseEntity<>(jcmsApiError, jcmsApiError.getErrorStatus());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception ex, HttpServletRequest request) {

        JcmsApiError jcmsApiError = JcmsApiError.builder()
                .requestedService(request.getServletPath())
                .exception(ex.getClass().getSimpleName())
                .errorMessage(ex.getMessage())
                .build();

        return new ResponseEntity<>(jcmsApiError, jcmsApiError.getErrorStatus());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleRuntimeException(RuntimeException ex, HttpServletRequest request) {

        JcmsApiError jcmsApiError = JcmsApiError.builder()
                .requestedService(request.getServletPath())
                .exception(ex.getClass().getSimpleName())
                .errorMessage(ex.getMessage())
                .build();

        return new ResponseEntity<>(jcmsApiError, jcmsApiError.getErrorStatus());
    }
}