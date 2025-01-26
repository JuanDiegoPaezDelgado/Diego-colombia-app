import React from "react";
import { Redirect } from "expo-router";
import Login from "./userSignMethods/Login";

const StartPage = () => {
  return <Login />; //<Redirect href="componentes/userSignMethods/Login" />;
};

export default StartPage;
