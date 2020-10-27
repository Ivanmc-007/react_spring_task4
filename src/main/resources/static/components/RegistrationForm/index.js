import React, { Component } from "react";

class RegistrationForm extends Component {

   render() {
      return (
         <form action="/registration" method="POST">
            <input type="text" placeholder="Name" name="name" />
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button type="submit">Register now</button>
         </form>
      );
   }

}

export default RegistrationForm;