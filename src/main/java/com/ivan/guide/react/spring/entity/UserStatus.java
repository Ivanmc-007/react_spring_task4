package com.ivan.guide.react.spring.entity;

public enum UserStatus {
   BLOCK("BLOCK"), UNBLOCK("UNBLOCK");

   UserStatus(String status) {
      this.status = status;
   }

   String status;

}