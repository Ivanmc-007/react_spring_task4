package com.ivan.guide.react.spring.controller;

import com.ivan.guide.react.spring.annotation.CurrentUser;
import com.ivan.guide.react.spring.entity.User;
import com.ivan.guide.react.spring.entity.UserStatus;
import com.ivan.guide.react.spring.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;
import java.util.Optional;

@Controller
@RequestMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
public class NavigationController {
   private final static Logger LOG = LoggerFactory.getLogger(NavigationController.class);

   private final UserService userService;

   public NavigationController(UserService userService) {
      this.userService = userService;
   }

   @GetMapping
   public String index(@CurrentUser User user, Model model) {
      model.addAttribute("currUser", user);
      return "index";
   }

   @GetMapping("/login")
   public String logGet() {
      return "login";
   }

   @GetMapping("/registration")
   public String regGet() {
      return "registration";
   }

   @PostMapping("/registration")
   public String regPost(User user) {
      Optional<User> optional = userService.getUserByEmail(user.getEmail());
      if (optional.isEmpty()) {
         user.setDateRegistration(new java.sql.Date(new Date().getTime()));
         user.setUserStatus(UserStatus.UNBLOCK);
         userService.save(user);
         return "redirect:/login";
      } else {
         LOG.info("User with this email exists!");
         return "registration";
      }
   }
}