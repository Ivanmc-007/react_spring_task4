import React from "react";
import "./style.scss";

function HeaderSection() {
   return (
      <section className="section-header">
         <div className="section-header__logo">
            <a href="/">Main page</a>
         </div>
         <nav className="section-header__menu">
            <ul className="section-header__list">
               <li className="section-header__point">
                  <a href="/login">Login</a></li>
               <li className="section-header__point">
                  <a href="/registration">Registration</a>
               </li>
            </ul>
         </nav>
      </section>
   );
}

export default HeaderSection;