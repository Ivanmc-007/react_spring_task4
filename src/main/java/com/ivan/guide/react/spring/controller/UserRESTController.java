package com.ivan.guide.react.spring.controller;

import com.ivan.guide.react.spring.annotation.CurrentUser;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import com.ivan.guide.react.spring.entity.User;
import com.ivan.guide.react.spring.entity.UserStatus;
import com.ivan.guide.react.spring.entity.dto.UserId;
import com.ivan.guide.react.spring.exception.UserNotFoundException;
import com.ivan.guide.react.spring.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserRESTController {

   private final UserService userService;

   public UserRESTController(UserService userService) {
      this.userService = userService;
   }

   @GetMapping
   public List<User> users() {
      return userService.getAll();
   }

   @GetMapping("/{id}")
   public User user(@PathVariable Long id) {
      return userService.getUserById(id).orElseThrow(UserNotFoundException::new);
   }

   @PostMapping
   public User createNewUser(@RequestBody User user) {
      user.setId(null);
      return userService.save(user);
   }

   // @PutMapping is replaced by POST because WARNING in Spring, and from time to
   // time it works not correctly
   @PostMapping("/update-status-block")
   public List<User> updateStatusBlock(@RequestBody List<UserId> listUserId, @CurrentUser User user) {
      List<User> listRes = new ArrayList<>();
      for (UserId userId : listUserId) {
         User userDB = userService.getUserById(userId.getId()).orElseThrow(UserNotFoundException::new);
         userDB.setUserStatus(UserStatus.BLOCK);
         listRes.add(userService.save(userDB));
      }
      return listRes;
   }

   // @PutMapping is replaced by POST because WARNING in Spring, and from time to
   // time it works not correctly
   @PostMapping("/update-status-unblock")
   public List<User> updateStatusUnblock(@RequestBody List<UserId> listUserId) {
      List<User> listRes = new ArrayList<>();
      listUserId.forEach(userId -> {
         User userDB = userService.getUserById(userId.getId()).orElseThrow(UserNotFoundException::new);
         userDB.setUserStatus(UserStatus.UNBLOCK);
         listRes.add(userService.save(userDB));
      });
      return listRes;
   }

   @DeleteMapping("/delete-user-list")
   public void deleteUsers(@RequestBody List<UserId> listUserId) {
      for (UserId userId : listUserId) {
         userService.removeUserById(userId.getId());
      }
   }

   @GetMapping("/current-user")
   public User getCurrentUser(@CurrentUser User user) {
      return user;
   }

}