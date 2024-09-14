package com.justcallmesam.webutils.controller;

import org.apache.commons.codec.binary.Base64;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/codec")
public class CodecController {

    @GetMapping("/encodeBase64/{input}")
    public ResponseEntity<String> encodeBase64(@PathVariable String input) {
        String encodedString = new String(Base64.encodeBase64(input.getBytes()));
        return ResponseEntity.ok(encodedString);
    }

    @GetMapping("/decodeBase64/{input}")
    public ResponseEntity<String> decodeBase64(@PathVariable String encodedInput) {
        String encodedString = new String(Base64.decodeBase64(encodedInput.getBytes()));
        return ResponseEntity.ok(encodedString);
    }

}
