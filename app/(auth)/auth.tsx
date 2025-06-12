import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from 'react-native-paper'
import { AntDesign } from "@expo/vector-icons"
import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

export default function SingUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp()


    const theme = useTheme()
    const [error, setError] = useState<string | null>("");
    const [ emailAddress, setEmailAddress ] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")
    const [ pendingVerification, setPendingVerification ] = useState<boolean>(false)
    const [ code, setCode ] = useState<string>("")


    async function handleOnSignUpPress() {
        if(!isLoaded) return setError("Usuário não existe, crie sua conta");

        try {
            await signUp.create({
                emailAddress,
                password
            })

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            setPendingVerification(true);

        } catch(err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    async function handleOnVerifyCode() {
        if(!isLoaded) return setError("Usuário não existe, crie sua conta");

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({ code })

            if(signUpAttempt.status === "complete") {
                await setActive({ session: signUpAttempt.createdSessionId })
                router.replace("/(tabs)/home")
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }

        } catch(err) {
            console.error(JSON.stringify(err, null, 2))


        }
        
    }

    if(pendingVerification) {
        return(
            <View style={styles.containerView}>
                <Text variant="headlineSmall" style={styles.title}>Verifique o seu email</Text>
                <TextInput 
                  label="Código de Verificação"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  mode="outlined"
                  activeOutlineColor="#3b0000"
                  value={code}
                  onChangeText={(codeProp) => setCode(codeProp)}

                />
                <Button mode="contained" buttonColor="#3b0000" onPress={handleOnVerifyCode}>
                <Text variant="titleMedium" style={styles.btnText}>Verificar</Text> 
            </Button>
            </View>
        )
    }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <View style={styles.containerView}>
            <Text variant="headlineMedium" style={styles.title}>
                Bem Vindo, Crie sua Conta
            </Text>

            <TextInput 
              value={emailAddress}
              label="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="example@gmail.com"
              mode="outlined"
              activeOutlineColor="#3b0000"
              onChangeText={(email) => setEmailAddress(email)}
        
              
            />
            <TextInput 
              value={password}
              label="Senha"
              autoCapitalize="none"
              secureTextEntry
              mode="outlined"
              activeOutlineColor="#3b0000"
              onChangeText={(passwordProp) => setPassword(passwordProp)}
            />

            <Button mode="contained" buttonColor="#3b0000" onPress={handleOnSignUpPress}>
                <Text variant="titleMedium" style={styles.btnText}>Próximo</Text> 
            </Button>

            <View style={styles.containerFooter}>
                <Text variant="titleMedium">Possui uma conta?</Text>
                <Link href={"/(auth)/login"}><Text variant="titleSmall">Faça o seu Login</Text></Link>
            </View>


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
    },
    containerFooter: {
        alignItems: "center",

    }
})