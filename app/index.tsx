import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { asyncStorageService } from "../app/userSignMethods/asyncStorageService";
import Login from "../app/userSignMethods/Register";

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
          router.replace("/userSignMethods/Register");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        router.replace("/userSignMethods/Register");
      }
    };

    checkTokenAndNavigate();
  }, []);
}
