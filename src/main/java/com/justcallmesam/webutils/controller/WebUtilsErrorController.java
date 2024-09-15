package com.justcallmesam.webutils.controller;

import com.justcallmesam.webutils.exception.WebUtilsException;
import com.justcallmesam.webutils.model.WebUtilsError;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebUtilsErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request) throws WebUtilsException {
        WebUtilsError webUtilsError = WebUtilsError.builder()
                .requestedService(request.getServletPath())
                .errorMessage("You seem to have taken a wrong turn.")
                .errorStatus(HttpStatus.INTERNAL_SERVER_ERROR)
                .build();

        throw new WebUtilsException(webUtilsError);
    }
}
