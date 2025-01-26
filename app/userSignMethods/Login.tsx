import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import ApiService from "../service/apiService";
import { asyncStorageService } from "../userSignMethods/asyncStorageService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    const regex = /.+@.+\..+/;
    return regex.test(email);
  };

  const isPasswordSafe = (password: string) => {
    return (
      password.length >= 8 &&
      /[0-9]/.test(password) &&
      /[a-zA-Z]/.test(password)
    );
  };

  const handleLogin = async () => {
    if (!email) {
      Alert.alert("Email vacío", "Introduzca un email.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Email inválido", "Introduce un email válido");
      return;
    }
    if (!password) {
      Alert.alert("Contraseña vacía", "Introduzca una contraseña");
      return;
    }
    if (!isPasswordSafe(password)) {
      Alert.alert(
        "Contraseña inválida",
        "La contraseña debe tener al menos 8 caracteres y además debe tener números y letras"
      );
      return;
    }

    try {
      const result = await ApiService.login(email, password);

      if (result.status == 201) {
        Alert.alert("Login exitoso", "Bienvenido de nuevo!");

        await asyncStorageService.save(
          asyncStorageService.KEYS.userToken,
          result.data.token
        );

        router.navigate("../drawer/welcomepage");
      } else if (result.status == 401) {
        Alert.alert("Login fallido", "Credenciales incorrectas");
      } else {
        Alert.alert(
          "Error",
          result.data.message || "Algo salió mal durante el login."
        );
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={styles.title}>INICIAR SESIÓN</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <Text style={styles.loginLink}>
          Si no tienes cuenta entonces{" "}
          <Link style={styles.linkText} href={"/userSignMethods/Register"}>
            <Text style={styles.linkText}>Regístrate!!!!</Text>
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
