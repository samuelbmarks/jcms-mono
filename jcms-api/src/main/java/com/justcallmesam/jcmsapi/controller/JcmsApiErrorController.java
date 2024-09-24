package com.justcallmesam.jcmsapi.controller;

import com.justcallmesam.jcmsapi.exception.JcmsApiException;
import com.justcallmesam.jcmsapi.model.JcmsApiError;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JcmsApiErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request) throws JcmsApiException {
        JcmsApiError jcmsApiError = JcmsApiError.builder()
                .requestedService(request.getServletPath())
                .errorMessage("You seem to have taken a wrong turn.")
                .errorStatus(HttpStatus.INTERNAL_SERVER_ERROR)
                .build();

        throw new JcmsApiException(jcmsApiError);
    }
}
