import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";

const Register = () => {
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={styles.title}>REGISTRAR</Text>
        <TextInput style={styles.input} placeholder="Nombre completo" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <Text style={styles.loginLink}>
          Si ya tienes una cuenta entonces{" "}
          <Link style={styles.linkText} href={"/userSignMethods/Login"}>
            <Text style={styles.linkText}>Inicia Sesion!!</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  secondContainer: {
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    height: "98%",
    width: "90%",
    backgroundColor: "#e5e7fd",
    borderRadius: 30,
  },
  title: {
    fontSize: 40,
    marginBottom: 30,
    fontWeight: "bold",
    color: "black",
  },
  input: {
    width: "90%",
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#ffee99",
    fontSize: 16,
    color: "black",
  },
  button: {
    backgroundColor: "#ffa500",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginLink: {
    marginTop: 20,
    color: "#777",
    fontSize: 14,
  },
  linkText: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});

export default Register;
