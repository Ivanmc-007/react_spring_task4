import React, { Component } from "react";
import "./style.scss";

class LoginForm extends Component {

   render() {
      return (
         <form action="/login" method="POST" className="form-login">
            <input type="text" placeholder="Email" name="username" className="form-login__input" />
            <input type="password" placeholder="Password" name="password" className="form-login__input" />
            <button type="submit" className="form-login__button" >Log In</button>
         </form>
      );
   }

}

export default LoginForm;