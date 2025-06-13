import { useSignIn, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, TextInput, Text, useTheme, ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Dispatch, SetStateAction, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { handleErrorSignIn } from "@/src/functions";


export interface ErrorProps {

    status: number;
    clerkError: boolean;
    errors: [
    {
      code: string;
      message: string;
      longMessage: string;
      meta: {
        paramName: string
    }}]
}




export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const { user } = useUser()
    const theme = useTheme()

    const [errorPassword, setErrorPassword] = useState<string | null>("");
    const [errorEmail, setErrorEmail] = useState<string | null>("");
    const [ emailAddress, setEmailAddress ] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")



    

    async function handleOnSignInPress() {
        if(!isLoaded) return setErrorEmail("Usuário não está logado");

        const emailClient = user?.primaryEmailAddress?.emailAddress

        if(!emailAddress || !password) {
            setErrorEmail("Preecha todos os campos, por gentileza!");
            setErrorPassword("Preecha todos os campos, por gentileza!")
            return;
        }
        if(password.length < 8) {
            setErrorPassword("Senha Inválida")
            return;
        }

      

        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password
            })

            if(signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace("/(tabs)/home");
                setErrorEmail(null)
                setErrorPassword(null)
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
            }

        } catch(err) {
            const error = err as ErrorProps
            handleErrorSignIn(error, setErrorEmail, setErrorPassword)
        }

    }


    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.containerView}>
                <Text variant="headlineMedium" style={styles.title}>
                    Bem Vindo, Faça o Login
                </Text>
                <TextInput 
                value={emailAddress}
                label="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="example@gmail.com"
                mode="outlined"
                activeOutlineColor="#3b0000"
                onChangeText={(email) => {
                    setEmailAddress(email)
                    setErrorEmail(null)
                }}
                
                />

                {errorEmail && (
                    <Text style={{ color: theme.colors.error }}><AntDesign name="exclamationcircleo" /> {errorEmail}</Text> 
                )}

                <TextInput 
                value={password}
                label="Senha"
                autoCapitalize="none"
                secureTextEntry
                mode="outlined"
                activeOutlineColor="#3b0000"
                onChangeText={(passwordProp) => {
                    setPassword(passwordProp)
                    setErrorPassword(null)
                }}
                />

                {errorPassword &&  (
                    <Text style={{ color: theme.colors.error }}><AntDesign name="exclamationcircleo" /> {errorPassword}</Text> 
                )}

                <Button mode="contained" buttonColor="#3b0000" onPress={handleOnSignInPress}>
                    <Text variant="titleMedium" style={styles.btnText}>Iniciar Sessão</Text> 
                </Button>

                <View style={styles.containerFooter}>
                    <Text variant="titleMedium">Não Possui uma conta?</Text>
                    <Link href={"/(auth)/auth"}><Text variant="titleSmall">Cria a sua Conta</Text></Link>
                </View>
            </View>
    
        </KeyboardAvoidingView>
    )

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
