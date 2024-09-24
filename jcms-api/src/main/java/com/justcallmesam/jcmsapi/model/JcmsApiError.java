package com.justcallmesam.jcmsapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.justcallmesam.jcmsapi.exception.JcmsApiException;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@Builder
public class JcmsApiError {

    @JsonProperty("requested_service")
    private String requestedService;

    @JsonProperty("exception")
    @Builder.Default
    private String exception = JcmsApiException.class.getSimpleName();

    @JsonProperty("error_message")
    private String errorMessage;

    @JsonProperty("error_status")
    @Builder.Default
    private HttpStatus errorStatus = HttpStatus.BAD_REQUEST;
}
