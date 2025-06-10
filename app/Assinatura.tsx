import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, Button } from "react-native-paper";
import Signature from "react-native-signature-canvas";
import { useLocalSearchParams, useRouter } from "expo-router";
import dayjs from "dayjs";

export default function Assinatura() {
  const signatureRef = useRef<any>(null);
  const router = useRouter();
  const { valor } = useLocalSearchParams();

  const handleOK = (signature: string) => {
    const data = dayjs().format("DD/MM/YYYY");
    router.push({
      pathname: "/Comprovante",
      params: { valor, assinatura: signature, data }
    });
  };

    return (
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          Assinatura do Cliente
        </Text>
        <View style={styles.signatureBox}>
          <Signature
            ref={signatureRef}
            onOK={handleOK}
            descriptionText="Assine abaixo"
            // clearText="Limpar"
            // confirmText="Salvar"
            webStyle={`
              body,html {width: 100vw; height: 100vh;}
            `}
            autoClear={false}
            backgroundColor="#fff"
          />
        </View>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => signatureRef.current?.clearSignature()}
        >
          Limpar Assinatura
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => signatureRef.current?.readSignature()}
        >
          Salvar Assinatura
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
      alignItems: "center",
    },
    title: {
      marginBottom: 24,
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 22,
    },
    signatureBox: {
      width: Dimensions.get("window").width - 48,
      height: 600,
      borderWidth: 2,
      borderRadius: 8,
      backgroundColor: "#fffde7",
      marginBottom: 24,
      overflow: "hidden",
    },
    button: {
      marginTop: 8,
      alignSelf: "center",
      width: 200,
    },
  });
