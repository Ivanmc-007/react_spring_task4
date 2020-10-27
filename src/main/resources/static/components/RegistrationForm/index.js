import React, { Component } from "react";
import "./style.scss";

class RegistrationForm extends Component {

   render() {
      return (
         <form action="/registration" method="POST" className="form-registration" >
            <input type="text" placeholder="Name" name="name" className="form-registration__input" />
            <input type="email" placeholder="Email" name="email" className="form-registration__input" />
            <input type="password" placeholder="Password" name="password" className="form-registration__input" />
            <button type="submit" className="form-registration__button">Register now</button>
         </form>
      );
   }

}

export default RegistrationForm;