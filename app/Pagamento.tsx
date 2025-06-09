import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Pagamento() {
    const [dinheiro, setDinheiro] = useState<string>("");
    const [cheque, setCheque] = useState<string>("");
    const [pix, setPix] = useState<string>("");
    const [deposito, setDeposito] = useState<string>("");
    const router = useRouter();

  // Função para converter string para número, tratando vazio e vírgula
    const toNumber = (value: string) =>
        Number(value.replace(",", ".").replace(/[^0-9.]/g, "")) || 0;

    const total =
        toNumber(dinheiro) + toNumber(cheque) + toNumber(pix) + toNumber(deposito);

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
            Pagamento
        </Text>

        <TextInput
            label="Dinheiro"
            value={dinheiro}
            onChangeText={setDinheiro}
            keyboardType="numeric"
            style={styles.input}
        />
        <TextInput
            label="Cheque"
            value={cheque}
            onChangeText={setCheque}
            keyboardType="numeric"
            style={styles.input}
        />
        <TextInput
            label="Pix"
            value={pix}
            onChangeText={setPix}
            keyboardType="numeric"
            style={styles.input}
        />
        <TextInput
            label="Depósito"
            value={deposito}
            onChangeText={setDeposito}
            keyboardType="numeric"
            style={styles.input}
        />

        <View style={styles.totalContainer}>
            <Text variant="titleMedium">Total: R$ {total.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={() => router.push("/Assinatura")}>
                Confirmar Pagamento
            </Button>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    marginBottom: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  totalContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 32,
    alignItems: "center",
  },
});
