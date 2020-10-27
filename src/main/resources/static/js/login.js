import React from "react";
import ReactDom from "react-dom";
import Wrapper from "../components/Wrapper/index";
import LoginSectionOne from "../components/LoginSectionOne/index";

ReactDom.render(<Wrapper />, document.getElementById("root"));
ReactDom.render(<LoginSectionOne />, document.getElementById("main"));