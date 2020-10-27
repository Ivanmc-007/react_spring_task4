import React from "react";
import ReactDom from "react-dom";
import Wrapper from "../components/Wrapper/index";
import RegistrationSectionOne from "../components/RegistrationSectionOne/index";

ReactDom.render(<Wrapper />, document.getElementById("root"))
ReactDom.render(<RegistrationSectionOne />, document.getElementById("main"));
