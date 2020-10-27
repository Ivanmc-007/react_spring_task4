package com.ivan.guide.react.spring.service;

import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.*;

import com.ivan.guide.react.spring.entity.User;
import com.ivan.guide.react.spring.entity.UserStatus;

@Service
public class UserService {
   // TODO: заглушка DB
   private Long countKey = 123L;
   // TODO: заглушка DB
   private Map<Long, User> userList = new HashMap<>() {
      {
         User user1 = new User();
         user1.setId(120L);
         user1.setName("Krokoziabrik");
         user1.setEmail("krokoziabrik@mail.ru");
         user1.setDateRegistration(new Date(1588444400000L));
         user1.setDateLogin(new Date(1588453200000L));
         user1.setUserStatus(UserStatus.UNBLOCK);
         user1.setPassword("1");

         User user2 = new User();
         user2.setId(121L);
         user2.setName("Gribichek");
         user2.setEmail("gribichek@mail.ru");
         user2.setDateRegistration(new Date(1588444000000L));
         user2.setDateLogin(new Date(1588450000000L));
         user2.setUserStatus(UserStatus.UNBLOCK);
         user2.setPassword("1");
         this.put(user1.getId(), user1);
         this.put(user2.getId(), user2);
      }
   };

   public List<User> getAll() {
      return new ArrayList<>(userList.values());
   }

   public Optional<User> getUserById(Long id) {
      return Optional.ofNullable(userList.get(id));
   }

   public Optional<User> getUserByEmail(String email) {
      for (User user : userList.values()) {
         if (Objects.equals(email, user.getEmail()))
            return Optional.of(user);
      }
      return Optional.empty();
   }

   public Optional<User> getUserByEmailAndPassword(String email, String password) {
      for (User user : userList.values()) {
         if (Objects.equals(email, user.getEmail()) && Objects.equals(password, user.getPassword()))
            return Optional.of(user);
      }
      return Optional.empty();
   }

   public Optional<User> setUserBlockStatusById(Long id) {
      User user = userList.get(id);
      if (Objects.nonNull(user)) {
         user.setUserStatus(UserStatus.BLOCK);
      }
      return Optional.empty();
   }

   public Optional<User> setUserUnblockStatusById(Long id) {
      User user = userList.get(id);
      if (Objects.nonNull(user)) {
         user.setUserStatus(UserStatus.UNBLOCK);
      }
      return Optional.empty();
   }

   // TODO: may be remove if I wont use this method
   public Optional<User> updateUserStatusById(Long id, UserStatus userStatus) {
      return (Objects.equals(UserStatus.BLOCK, userStatus)) ? setUserBlockStatusById(id) : setUserUnblockStatusById(id);
   }

   public void removeUserById(Long id) {
      userList.remove(id);
   }

   public User save(User user) {
      if (user.getId() != null && user.getId() >= 0 && user.getId() <= countKey) {
         // обновление
         userList.put(user.getId(), user);
         return user;
      }
      // сохранение
      user.setId(countKey++);
      userList.put(user.getId(), user);
      return user;
   }

}