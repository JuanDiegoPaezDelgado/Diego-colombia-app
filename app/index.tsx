import React from "react";
import { Redirect } from "expo-router";
import Login from "./userSignMethods/Login";
import Register from "./userSignMethods/Register";

const StartPage = () => {
  return Register; //<Redirect href="componentes/userSignMethods/Login" />;<Login />
};

export default StartPage;
