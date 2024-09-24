package com.justcallmesam.jcmsapi.interceptor;

import com.justcallmesam.jcmsapi.exception.JcmsApiException;
import com.justcallmesam.jcmsapi.model.JcmsApiError;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@Slf4j
public class RequestInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws JcmsApiException {
        log.info("Received request: {} {}", request.getMethod(), request.getServletPath());

        String requestUri = request.getRequestURI();

        // Handle trailing slash(es)
        if (requestUri.endsWith("/")) {
            log.info("Request contains trailing slash. Removing and re-routing.");

            String updatedUri = requestUri.replaceAll("/$", "");

            try {
                response.sendRedirect(updatedUri);
                return false;
            } catch (Exception e) {
                JcmsApiError jcmsApiError = JcmsApiError.builder()
                        .requestedService(request.getServletPath())
                        .exception(e.getClass().getSimpleName())
                        .errorMessage(String.format("Error occurred while re-routing request: %s", e.getMessage()))
                        .errorStatus(HttpStatus.INTERNAL_SERVER_ERROR)
                        .build();
                throw new JcmsApiException(jcmsApiError);
            }
        }
        return true;
    }
}