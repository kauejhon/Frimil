import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  // Simulação de dados do usuário logado
  const usuario = {
    nome: "João da Silva",
    foto: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  const handleLogout = () => {
    // Aqui você pode limpar tokens, contexto, etc, se necessário
    router.replace("/auth");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: usuario.foto }} style={styles.foto} />
      <Text style={styles.nome}>{usuario.nome}</Text>
      <Button mode="contained" style={styles.botao} onPress={handleLogout}>
        Sair
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#b7950b",
  },
  nome: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#333",
  },
  botao: {
    width: 200,
  },
});
