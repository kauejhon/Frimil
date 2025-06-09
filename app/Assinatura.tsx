import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, Button } from "react-native-paper";
import Signature from "react-native-signature-canvas";
import { useRouter } from "expo-router";

export default function Assinatura() {
  const signatureRef = useRef<any>(null);
  const router = useRouter();

  const handleOK = (signature: string) => {
    router.back(); // Volta para a tela anterior
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Assinatura do Cliente
      </Text>
      <Signature
        ref={signatureRef}
        onOK={handleOK}
        descriptionText="Assine abaixo"
        clearText="Limpar"
        confirmText="Salvar"
        webStyle={`
          .m-signature-pad--footer {display: none; margin: 0px;}
          body,html {width: 100vw; height: 100vh;}
        `}
        autoClear={false}
        backgroundColor="#fff"
      />
      <Button
        style={styles.button}
        mode="outlined"
        onPress={() => signatureRef.current?.clearSignature()}
      >
        Limpar Assinatura
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    title: {
        marginBottom: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
        button: {
        marginTop: 16,
        alignSelf: "center",
    },
});
