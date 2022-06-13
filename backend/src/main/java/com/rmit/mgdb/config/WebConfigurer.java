package com.rmit.mgdb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Nullable;

/**
 * Configures Spring Web to allow certain CORS mappings.
 */
@Configuration
public class WebConfigurer {

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(@Nullable CorsRegistry registry) {
                if (registry != null) {
                    WebMvcConfigurer.super.addCorsMappings(registry);
                    registry.addMapping("/**")
                            .allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE");
                }
            }

        };
    }
}
