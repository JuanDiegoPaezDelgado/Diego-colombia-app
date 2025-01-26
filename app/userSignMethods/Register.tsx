import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";

const Register = () => {
  const [fullname, setFullname] = useState("");
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

  const handleRegister = async () => {
    if (!fullname) {
      Alert.alert("Nombre vacio", "Introduzca un nombre completo");
      return;
    }
    if (!email) {
      Alert.alert("Email vacio", "Introduzca un email.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Email invalido", "Introduce un email valido");
      return;
    }
    if (!password) {
      Alert.alert("Contraseña vacia", "Introduzca una contraseña");
      return;
    }
    if (!isPasswordSafe(password)) {
      Alert.alert(
        "Contraseña invalida",
        "La contraseña debe tener al menos 8 caracteres y ademas debe tener numeros y letras"
      );
      return;
    }

    try {
      const apiUrl = "http://192.168.1.135:5000/auth/register";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, pswd: password }),
      });

      if (response.status === 201) {
        Alert.alert("Registrado", "El registro ha sido completado!");
        Alert.alert("Registro exitoso");
        router.navigate("/userSignMethods/Login");
      } else if (response.status === 400) {
        Alert.alert(
          "Error en el servidor",
          "La solicitud no pudo ser procesada"
        );
      } else if (response.status === 409) {
        Alert.alert(
          "Usuario ya existe",
          "Ya existe un usuario registrado con ese email."
        );
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Error en el registro",
          errorData.message || "Algo salió mal durante el registro."
        );
      }
    } catch (error) {
      console.error("Error de red o al llamar a la API:", error);
      Alert.alert(
        "Error",
        "Error al conectar con el servidor. Inténtalo de nuevo."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={styles.title}>REGISTRAR</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre Completo"
          value={fullname}
          onChangeText={setFullname}
        />
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
        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </Pressable>
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

export default Register;
