package com.ivan.guide.react.spring.service;

import com.ivan.guide.react.spring.entity.User;
import com.ivan.guide.react.spring.entity.UserStatus;
import com.ivan.guide.react.spring.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
   private final UserRepository userRepository;

   public UserService(UserRepository userRepository) {
      this.userRepository = userRepository;
   }

   public List<User> getAll() {
      return userRepository.findAll();
   }

   public Optional<User> getUserById(Long id) {
      return userRepository.findById(id);
   }

   public Optional<User> getUserByEmail(String email) {
      return userRepository.findByEmail(email);
   }

   public Optional<User> setUserBlockStatusById(Long id) {
      Optional<User> optional = userRepository.findById(id);
      if(optional.isPresent()) {
         User user = optional.get();
         if(Objects.equals(user.getUserStatus(), UserStatus.BLOCK))
            return optional;
         user.setUserStatus(UserStatus.BLOCK);
         return Optional.of(userRepository.save(user));
      }
      return Optional.empty();
   }

   public Optional<User> setUserUnblockStatusById(Long id) {
      Optional<User> optional = userRepository.findById(id);
      if(optional.isPresent()) {
         User user = optional.get();
         if(Objects.equals(user.getUserStatus(), UserStatus.UNBLOCK))
            return optional;
         user.setUserStatus(UserStatus.UNBLOCK);
         return Optional.of(userRepository.save(user));
      }
      return Optional.empty();
   }

   public void removeUserById(Long id) {
      userRepository.deleteById(id);
   }

   public User save(User user) {
      return userRepository.save(user);
   }

}