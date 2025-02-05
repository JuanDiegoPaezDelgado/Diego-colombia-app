import { useEffect } from "react";
import { useRouter } from "expo-router";

import { asyncStorageService } from "../app/userSignMethods/asyncStorageService";

export default function StartPage() {
  const router = useRouter();

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const token = await asyncStorageService.get(
          asyncStorageService.KEYS.userToken
        );
        if (token) {
          router.replace("/drawer/welcomepage");
        } else {
          router.replace("/userSignMethods/Login");
        }
      } catch (error) {
        console.error("Error al leer el token:", error);
        router.replace("/userSignMethods/Login");
      }
    };

    checkTokenAndNavigate();
  }, []);
}
