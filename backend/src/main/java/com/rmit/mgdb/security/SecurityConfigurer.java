package com.rmit.mgdb.security;

import com.rmit.mgdb.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Single source of configuration for Spring Security.
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        prePostEnabled = true
)
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {

    private CustomUserDetailsService userDetailsService;
    private JWTAuthenticationEntryPoint authenticationEntryPoint;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public void setAuthenticationEntryPoint(JWTAuthenticationEntryPoint authenticationEntryPoint) {
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Autowired
    public void setUserDetailsService(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Autowired
    public void setPasswordEncoder(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    /*
     * Spring Security requires this very specific override of this method. Do not modify.
     */
    @Override
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    /**
     * This Bean defines how to instantiate the custom JWT authentication filter.
     */
    @Bean
    public JWTAuthenticationFilter jwtAuthenticationFilter() {
        return new JWTAuthenticationFilter();
    }

    /**
     * Configures the authentication manager to use the custom implementation of the {@link UserDetailsService}.
     * And the previously Autowired BCrypt password encoder as the default password encoder.
     */
    @Override
    protected void configure(AuthenticationManagerBuilder builder) throws Exception {
        builder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    /**
     * Configures all HTTP communication.
     */
    @Override
    protected void configure(HttpSecurity security) throws Exception {
        security.httpBasic().and().cors().and().csrf().disable().exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().headers().frameOptions().sameOrigin()
                .and().authorizeRequests()
                .antMatchers(
                        "/",
                        "/favicon.ico",
                        "/**/*.png",
                        "/**/*.gif",
                        "/**/*.svg",
                        "/**/*.jpg",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js").permitAll()
                // TODO API endpoints are subject to change.

                // FIXME Production.
                //  .antMatchers("/api/experiments").permitAll()
                //  .antMatchers("/api/experiments/add").authenticated()
                //  .antMatchers("/api/experiments/get").permitAll()
                //  .antMatchers("/api/experiments/{id}/approve").hasRole(ADMIN.name())
                //  .antMatchers("/api/experiments/{id}/toggleDelete").hasRole(ADMIN.name())
                //  .antMatchers("/api/forCodes/**").permitAll()
                //  .antMatchers("/api/missions").permitAll()
                //  .antMatchers("/api/missions/add").authenticated()
                //  .antMatchers("/api/missions/{id}").permitAll()
                //  .antMatchers("/api/people").authenticated()
                //  .antMatchers("/api/people/add").authenticated()
                //  .antMatchers("/api/platforms/**").permitAll()
                //  .antMatchers("/api/roles/**").permitAll()
                //  .antMatchers("/api/search/**").permitAll()
                //  .antMatchers("/api/search/advanced").permitAll()
                //  .antMatchers("/api/search/users").authenticated()
                //  .antMatchers("/api/seoCodes/**").permitAll()
                //  .antMatchers("/api/users").hasRole(ADMIN.name())
                //  .antMatchers("/api/users/authenticated").permitAll()
                //  .antMatchers("/api/users/login").permitAll()
                //  .antMatchers("/api/users/register").permitAll()
                //  .antMatchers("/api/users/saveAll").hasRole(ADMIN.name())
                //  .antMatchers("/h2-console/**").permitAll()
                //  .anyRequest().authenticated();

                // FIXME Development.
                .antMatchers("/api/users/authenticated").authenticated()
                .anyRequest().permitAll();

        // Configure the JWT authentication filter to run before processing every HTTP request.
        security.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

}
