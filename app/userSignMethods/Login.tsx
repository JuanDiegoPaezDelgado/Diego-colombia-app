import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={styles.title}>INICIAR SESION</Text>

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

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            /* Aquí iría tu lógica de login */
          }}
        >
          <Text style={styles.buttonText}>Iniciar Sesion</Text>
        </TouchableOpacity>

        <Text style={styles.loginLink}>
          Si no tienes cuenta entonces{" "}
          <Link style={styles.linkText} href={"/userSignMethods/Register"}>
            <Text style={styles.linkText}>Registrate!!!!</Text>
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
    flex: 1,
  },
  secondContainer: {
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#e5e7fd",
    borderRadius: 30,
    paddingVertical: 20,
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
    marginTop: 10,
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
export default Login;
