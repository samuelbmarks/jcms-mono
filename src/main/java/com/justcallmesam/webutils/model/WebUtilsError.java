package com.justcallmesam.webutils.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.justcallmesam.webutils.exception.WebUtilsException;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@Builder
public class WebUtilsError {

    @JsonProperty("requested_service")
    private String requestedService;

    @JsonProperty("exception")
    @Builder.Default
    private String exception = WebUtilsException.class.getSimpleName();

    @JsonProperty("error_message")
    private String errorMessage;

    @JsonProperty("error_status")
    @Builder.Default
    private HttpStatus errorStatus = HttpStatus.BAD_REQUEST;
}
