package com.ivan.guide.react.spring.config;

import com.ivan.guide.react.spring.entity.User;
import com.ivan.guide.react.spring.service.UserService;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;

import java.util.Date;
import java.util.Optional;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

   private final UserService userService;

   public WebSecurityConfig(UserService userService) {
      this.userService = userService;
   }

   @Override
   protected void configure(HttpSecurity http) throws Exception {
      // TODO: .csrf()
      // .disable() delete or read about
      http.csrf().disable().authorizeRequests().antMatchers("/login", "/registration", "/static/**").permitAll()
            .anyRequest().authenticated().and().formLogin().loginPage("/login").permitAll().and().logout()// .logoutUrl("/login").invalidateHttpSession(true).deleteCookies("JSESSIONID")
            .permitAll();
   }

   @Override
   protected void configure(AuthenticationManagerBuilder auth) throws Exception {
      auth.userDetailsService(email -> {
         Optional<User> optional = userService.getUserByEmail(email);
         if (optional.isPresent()) {
            User userDB = optional.get();
            userDB.setDateLogin(new java.sql.Date(new Date().getTime()));
            userService.save(userDB);
            return userDB;
         }
         throw new UsernameNotFoundException(email);
      }).passwordEncoder(NoOpPasswordEncoder.getInstance()); // TODO: и так сойдёт!
   }
}
