import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Cliente() {
  const router = useRouter();
  const { clienteId, clienteNome } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Detalhes do Cliente
      </Text>
      <Text>Código: {clienteId}</Text>
      <Text>Nome: {clienteNome}</Text>
      <Text>Saldo atual: R$ 12.535,00</Text>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => router.push("/Pagamento")}>
          Ir para Pagamento
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
