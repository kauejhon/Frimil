import React from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

// Função para traduzir mensagens de erro
function traduzirErro(mensagem: string): string {
    if (!mensagem) return "Ocorreu um erro.";
    if (mensagem.includes("Invalid action")) return "Ação inválida.";
    if (mensagem.includes("Session already exists")) return "Sessão já existe.";
    if (mensagem.includes("Passwords must be 8 characters or more."))return "A senha precisa ter 8 caracteres ou mais.";
    if (mensagem.includes("That email address is taken. Please try another")) return "Usuário já cadastrado.";
    if (mensagem.includes("Invalid verification code")) return "Código de verificação inválido.";
    if (mensagem.includes("Enter email address.")) return "Digite seu endereço de e-mail.";
    if (mensagem.includes("is missing")) return "O e-mail é obrigatório.";
    if (mensagem.includes("is invalid")) return "O e-mail é inválido.";
    if (mensagem.includes("Enter password")) return "A senha é obrigatória.";
    if (mensagem.includes("Couldn't find your account")) return "Conta não encontrada";
    if (mensagem.includes("Identifier is invalid.")) return "O e-mail é inválido";
    return mensagem;
  }

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;
    setError("");
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)/home");
      } else {
        setError("Verificação adicional necessária.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      setError(traduzirErro(err.errors?.[0]?.message || "Erro ao fazer login"));
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Digite seu e-mail"
        onChangeText={setEmailAddress}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Digite sua senha"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <Text>Não tem uma conta?</Text>
        <Link href="/(auth)/auth">
          <Text style={styles.link}>Inscreva-se</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  error: {
    color: "red",
    marginBottom: 8,
    textAlign: "center",
  },
  input: {
    width: 300,
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: 300,
    height: 48,
    backgroundColor: "#7c1d1e",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  link: {
    color: "#7c1d1e",
    marginLeft: 4,
    fontWeight: "bold",
  },
});
