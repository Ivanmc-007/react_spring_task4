import React from "react";
import HeaderSection from "../HeaderSection/index";
import "./style.scss";

function Wrapper() {
   return (
      <div className="wrapper">
         <header className="header" style={{ backgroundColor: "#555", height: "70px" }}>
            <HeaderSection />
         </header>
         <main className="main" id="main"></main>
         <footer className="footer"></footer>
      </div>
   );
}

export default Wrapper;