package com.rmit.mgdb.controller;

import com.rmit.mgdb.payload.CaptchaResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/captcha")
public class CaptchaController {

    private final RestTemplateBuilder restTemplateBuilder;
    private final Environment env;

    @Autowired
    public CaptchaController(RestTemplateBuilder restTemplateBuilder, Environment env) {
        this.restTemplateBuilder = restTemplateBuilder;
        this.env = env;
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyCaptcha(@RequestParam("response") String response) {
        String secret = env.getProperty("recaptcha.secret");
        String url = "https://www.google.com/recaptcha/api/siteverify?secret=" + secret;
        if (!response.isBlank())
            url += "&response=" + response;

        RestTemplate restTemplate = restTemplateBuilder.build();
        CaptchaResponse captchaResponse = restTemplate.postForEntity(url, null, CaptchaResponse.class).getBody();
        return new ResponseEntity<>(captchaResponse, HttpStatus.OK);
    }

}
