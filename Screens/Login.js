import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Provider as PaperProvider,
  Avatar,
  TextInput as PaperTextInput,
  Button as PaperButton,
  Checkbox,
  Snackbar,
} from "react-native-paper";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [textSnackbar, setTextSnackbar] = useState("");

//   const navigation = useNavigation();
  const { setAuthData } = useAuth();

  const handleLogin = () => {

    // Simulamos una validación de correo y contraseña
    if (correo === "jorge@gmail.com" && clave === "123") {
      setAuthData(correo);
    //   navigation.navigate("Perfil");
    setTextSnackbar("Datos Correctos");

    } else {
      setShowSnackbar(true);
      setTextSnackbar("Correo o contraseña incorrectos");
    }
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Avatar.Image
          size={70}
          source={require("../img/logo.png")}
          style={styles.avatar}
        />
        <Text style={styles.title}>Inicio de Sesión</Text>
        <PaperTextInput
          label="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
          style={styles.input}
          activeUnderlineColor="#A52A2A"
          textColor="#333"
        />
        <PaperTextInput
          label="Contraseña"
          secureTextEntry={!showPassword}
          value={clave}
          onChangeText={setClave}
          style={styles.input}
          activeUnderlineColor="#A52A2A"
          textColor="#333"
        />

        <View style={[styles.showPasswordContainer, styles.leftAlign]}>
          <Checkbox
            status={showPassword ? "checked" : "unchecked"}
            onPress={() => setShowPassword(!showPassword)}
            color="#A52A2A"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showPasswordText}>Mostrar Contraseña</Text>
          </TouchableOpacity>
        </View>

        <PaperButton
          mode="contained"
          onPress={handleLogin}
          textColor="#fff"
          style={styles.button}
        >
          Iniciar Sesión
        </PaperButton>

        <Snackbar
          visible={showSnackbar}
          onDismiss={closeSnackbar}
          duration={3000}
        >
          {textSnackbar}
        </Snackbar>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#ffff",
  },
  button: {
    width: "100%",
    marginTop: 16,
    backgroundColor: "#A52A2A",
  },
  showPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftAlign: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  avatar: {
    marginTop: 90,
    backgroundColor: "transparent",
  },
});

export default Login;
