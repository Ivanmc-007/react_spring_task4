import React, { Component } from "react";

class LoginForm extends Component {

   render() {
      return (
         <form action="/login" method="POST">
            <input type="text" placeholder="Email" name="username" />
            <input type="password" placeholder="Password" name="password" />
            <button type="submit">Log In</button>
         </form>
      );
   }

}

export default LoginForm;