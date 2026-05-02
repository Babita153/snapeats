import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// 🔥 ADD THIS
import { registerUser } from "../services/firebase";

const Signup = () => {

  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [eye, setEye] = useState(false);
  const [eye2, setEye2] = useState(false);

  // ✅ FIXED SIGNUP FUNCTION
  const handleSignup = async () => {

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      // 🔥 Firebase Signup
      await registerUser(email, password);

      Alert.alert("Success", "Account Created Successfully ✅");

      navigation.navigate("Login");

    } catch (error) {
      console.log(error);
      Alert.alert("Signup Failed ❌", error.message);
    }
  };

  return (

    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>
          Please create your account
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>

        {/* Name */}
        <Text style={styles.label}>NAME</Text>
        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        {/* Email */}
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          placeholder="example@gmail.com"
          style={styles.input}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        {/* Password */}
        <Text style={styles.label}>PASSWORD</Text>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={!eye}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={() => setEye(!eye)}>
            <Image
              style={styles.icon}
              source={
                eye
                  ? require("../assets/view.png")
                  : require("../assets/hide.png")
              }
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={styles.label}>CONFIRM PASSWORD</Text>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Re-enter password"
            secureTextEntry={!eye2}
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity onPress={() => setEye2(!eye2)}>
            <Image
              style={styles.icon}
              source={
                eye2
                  ? require("../assets/view.png")
                  : require("../assets/hide.png")
              }
            />
          </TouchableOpacity>
        </View>

        {/* Signup Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
        >
          <Text style={styles.btnText}>SIGN UP</Text>
        </TouchableOpacity>

        {/* Login Redirect */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>
            Already have an account?
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButton}> Login</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>

  );
};

export default Signup;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  header: {
    backgroundColor: "#0b0f2f",
    height: 250,
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: "10%"
  },

  subtitle: {
    color: "#ddd",
    marginTop: 5
  },

  form: {
    padding: 25
  },

  label: {
    marginTop: 10,
    fontWeight: "bold"
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginTop: 5
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 10
  },

  passwordInput: {
    flex: 1,
    padding: 12
  },

  icon: {
    width: 22,
    height: 22
  },

  button: {
    backgroundColor: "#ff7a1a",
    padding: 15,
    borderRadius: 20,
    marginTop: 30
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25
  },

  loginText: {
    fontSize: 15
  },

  loginButton: {
    fontSize: 15,
    color: "blue"
  }

});