package com.justcallmesam.webutils.exception;

import com.justcallmesam.webutils.model.WebUtilsError;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WebUtilsException extends Exception {
    private final WebUtilsError webUtilsError;

    public WebUtilsException(WebUtilsError webUtilsError) {
        super(webUtilsError.getErrorMessage());
        this.webUtilsError = webUtilsError;
    }
}