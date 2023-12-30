import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginUsername,
  setLoginPassword,
  setLoginErrorMessage,
} from "../redux/authActions";

const LoginPage = ({ navigation }) => {
  const authDispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleUserLogin = () => {
    const { username, password } = authState;

    if (username === "user" && password === "user") {
      
      navigation.navigate("CustomDashboard");
    } else {
      authDispatch(setLoginErrorMessage("not valid credentials"));
    }
  };

  const handleUserSignup = () => {
    navigation.navigate("CustomSignup");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>User Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          onChangeText={(text) => authDispatch(setLoginUsername(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={(text) => authDispatch(setLoginPassword(text))}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleUserLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {authState.errorMessage ? (
          <Text style={styles.errorText}>{authState.errorMessage}</Text>
        ) : null}

        <TouchableOpacity style={styles.signupButton} onPress={handleUserSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  loginButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  signupButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default LoginPage;
