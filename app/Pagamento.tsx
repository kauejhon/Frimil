import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { Text, TextInput, Button, IconButton } from "react-native-paper";
import { useRouter } from "expo-router";

const saldoCliente = 5000;

export default function Pagamento() {
  const [dinheiro, setDinheiro] = useState<string>("");
  const [cheque, setCheque] = useState<string>("");
  const [pix, setPix] = useState<string>("");
  const [deposito, setDeposito] = useState<string>("");
  const router = useRouter();

  const toNumber = (value: string) =>
    Number(value.replace(",", ".").replace(/[^0-9.]/g, "")) || 0;

  const total =
    toNumber(dinheiro) + toNumber(cheque) + toNumber(pix) + toNumber(deposito);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <IconButton
            icon="arrow-left"
            size={28}
            style={styles.backButton}
            onPress={() => router.back()}
          />
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Pagamento</Text>
        </View>
        <View style={styles.headerRight} />
      </View>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: 80 }]}
      >
        <TextInput
          label="Dinheiro"
          value={dinheiro}
          onChangeText={setDinheiro}
          keyboardType="numeric"
          style={styles.input}
          underlineColor="#7c1d1e"
          activeUnderlineColor="#b22222"
        />
        <TextInput
          label="Cheque"
          value={cheque}
          onChangeText={setCheque}
          keyboardType="numeric"
          style={styles.input}
          underlineColor="#7c1d1e"
          activeUnderlineColor="#b22222"
        />
        <TextInput
          label="Pix"
          value={pix}
          onChangeText={setPix}
          keyboardType="numeric"
          style={styles.input}
          underlineColor="#7c1d1e"
          activeUnderlineColor="#b22222"
        />
        <TextInput
          label="Depósito"
          value={deposito}
          onChangeText={setDeposito}
          keyboardType="numeric"
          style={styles.input}
          underlineColor="#7c1d1e"
          activeUnderlineColor="#b22222"
        />
        <View style={styles.totalContainer}>
          <Text variant="titleMedium">Total: R$ {total.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonColor="#7c1d1e"
            style={{ borderRadius: 10 }}
            mode="contained"
            onPress={() =>
              router.push({
                pathname: "/Assinatura",
                params: { valor: total, saldo: saldoCliente },
              })
            }
          >
            Confirmar Pagamento
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight ?? 24 : 40,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingHorizontal: 8,
  },
  headerLeft: {
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  headerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  headerRight: {
    width: 48,
    height: "100%",
  },
  backButton: {
    backgroundColor: "transparent",
    marginRight: 0,
    alignSelf: "center",
    marginTop: Platform.OS === "android" ? 6 : 0,
  },
  headerTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 22,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
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
