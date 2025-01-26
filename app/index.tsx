import { useEffect } from "react";

import { router } from "expo-router";

import { asyncStorageService } from "../app/userSignMethods/asyncStorageService";

const StartPage = () => {
  const USER_TOKEN_KEY = asyncStorageService.KEYS.userToken;

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const token = await asyncStorageService.get<string>(USER_TOKEN_KEY);

        const isTokenValid = token != null;

        if (isTokenValid) {
          router.replace("/drawer/welcomepage");
        } else {
          router.replace("/userSignMethods/Register");
        }
      } catch (error) {
        console.error("Error al verificar el token:", error);

        router.replace("/userSignMethods/Register");
      }
    };

    checkUserToken();
  }, []);

  return null;
};

export default StartPage;
