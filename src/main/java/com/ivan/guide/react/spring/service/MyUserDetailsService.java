package com.ivan.guide.react.spring.service;

import com.ivan.guide.react.spring.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {
    private final UserService userService;

    public MyUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optional = userService.getUserByEmail(username);
        if (optional.isPresent()) {
            User userDB = optional.get();
            userDB.setDateLogin(new java.sql.Date(new Date().getTime()));
            userService.save(userDB);
            return userDB;
        }
        throw new UsernameNotFoundException(username);
    }
}
