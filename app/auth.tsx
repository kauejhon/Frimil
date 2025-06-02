import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from 'react-native-paper'
import { AntDesign } from "@expo/vector-icons"
import { router } from "expo-router";

export default function Index() {
    const theme = useTheme()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>("");



    const handleAuth = () => {
        if(!email || !password) {
            setError("Preencha todos os campos, por gentileza!")
            return;
        }
        if(password.length < 6) {
            setError("A senha deve ter mais de 6 caracteres!")
            return;
        }

        setError(null)
        
        if(email && password) {
            router.replace("/(tabs)/home")
        }
    }
    const handleDigit = () => {
        if(email.length >= 0) setError(null)
    }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <View style={styles.containerView}>
            <Text variant="headlineMedium" style={styles.title}>
                Bem Vindo, Sr. Vendedor!
            </Text>

            <TextInput 
              label="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="example@gmail.com"
              mode="outlined"
              activeOutlineColor="#3b0000"
              onChangeText={setEmail}
              onChange={handleDigit}
              
            />
            <TextInput 
              label="Senha"
              autoCapitalize="none"
              secureTextEntry
              mode="outlined"
              activeOutlineColor="#3b0000"
              onChangeText={setPassword}

              
            />
            { error && (
                <Text style={{ color: theme.colors.error }}><AntDesign name="exclamationcircleo" /> {error}</Text>
            ) }

            <Button mode="contained" buttonColor="#3b0000" onPress={handleAuth}>
                <Text variant="titleMedium" style={styles.btnText}>Iniciar Sessão</Text> 
            </Button>


        </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerView: {
        flex: 1,
        justifyContent: "center",
        gap: 10,
        padding: 15
    },
    title: {
        textAlign: "center",
        fontWeight: "bold"
    },
    btnText: {
        color: "#fff"
    }
})