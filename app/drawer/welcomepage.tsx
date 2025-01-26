import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { styles } from "../../styles/welcome.styles";
import { StatusBar } from "expo-status-bar";
import { asyncStorageService } from "../userSignMethods/asyncStorageService";

const WelcomePage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await asyncStorageService.remove(asyncStorageService.KEYS.userToken);
    router.replace("../userSignMethods/Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" />
      <Text style={styles.welcomeText}>Bienvenido a mi App</Text>
      <Text style={styles.welcomeText}> Espero disfrutes!!</Text>
      <Image
        source={require("../../assets/welcome.jpg")}
        style={styles.image}
      />
      <Pressable style={customStyles.logoutButton} onPress={handleLogout}>
        <Text style={customStyles.logoutText}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
};

export default WelcomePage;

const customStyles = {
  logoutButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
};
