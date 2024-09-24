package com.justcallmesam.jcmsapi.controller;

import com.justcallmesam.jcmsapi.exception.JcmsApiException;
import com.justcallmesam.jcmsapi.model.JcmsApiError;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/codec")
@Slf4j
public class CodecController {

    @GetMapping({"/b64/encode/{input}", "/b64/e/{input}"})
    public ResponseEntity<Object> encodeBase64(@PathVariable String input) {

        String encodedString = new String(Base64.encodeBase64(input.getBytes()));

        return ResponseEntity.ok(encodedString);
    }

    @GetMapping({"/b64/decode/{encodedInput}", "/b64/d/{encodedInput}"})
    public ResponseEntity<Object> decodeBase64(@PathVariable String encodedInput, HttpServletRequest request) throws JcmsApiException {

        if (!Base64.isBase64(encodedInput)) {
            JcmsApiError jcmsApiError = JcmsApiError.builder()
                    .requestedService(request.getServletPath())
                    .errorMessage(String.format("Input (%s) is not property base64 encoded", encodedInput))
                    .build();

            throw new JcmsApiException(jcmsApiError);
        }

        String decodedString = new String(Base64.decodeBase64(encodedInput.getBytes()));

        return ResponseEntity.ok(decodedString);
    }
}
