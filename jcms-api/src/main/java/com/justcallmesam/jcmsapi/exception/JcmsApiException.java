package com.justcallmesam.jcmsapi.exception;

import com.justcallmesam.jcmsapi.model.JcmsApiError;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JcmsApiException extends Exception {
    private final JcmsApiError jcmsApiError;

    public JcmsApiException(JcmsApiError jcmsApiError) {
        super(jcmsApiError.getErrorMessage());
        this.jcmsApiError = jcmsApiError;
    }
}