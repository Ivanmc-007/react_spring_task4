package com.ivan.guide.react.spring.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "usr")
public class User implements UserDetails {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private Long id;

   private String name;

   private String password;

   private String email;

   private Date dateRegistration;

   private Date dateLogin;

   @Enumerated(EnumType.STRING)
   private UserStatus userStatus;

   public void setId(Long id) {
      this.id = id;
   }

   public void setName(String name) {
      this.name = name;
   }

   public void setPassword(String password) {
      this.password = password;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public void setDateRegistration(Date dateRegistration) {
      this.dateRegistration = dateRegistration;
   }

   public void setDateLogin(Date dateLogin) {
      this.dateLogin = dateLogin;
   }

   public void setUserStatus(UserStatus userStatus) {
      this.userStatus = userStatus;
   }

   public Long getId() {
      return id;
   }

   public String getName() {
      return name;
   }

   public String getPassword() {
      return password;
   }

   public String getEmail() {
      return email;
   }

   public Date getDateLogin() {
      return dateLogin;
   }

   public Date getDateRegistration() {
      return dateRegistration;
   }

   public UserStatus getUserStatus() {
      return userStatus;
   }

   @Override
   public Collection<? extends GrantedAuthority> getAuthorities() {
      return new ArrayList<>();
   }

   @Override
   public String getUsername() {
      return getEmail();
   }

   @Override
   public boolean isAccountNonExpired() {
      return true;
   }

   @Override
   public boolean isAccountNonLocked() {
      return isEnabled();
   }

   @Override
   public boolean isCredentialsNonExpired() {
      return true;
   }

   @Override
   public boolean isEnabled() {
      return getUserStatus() != UserStatus.BLOCK;
   }

   // TODO: equals + hashCode

}