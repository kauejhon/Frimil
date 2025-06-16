import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
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
      params: { valor, assinatura: signature, data },
    });
  };

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
          <Text style={styles.headerTitle}>Assinatura do Cliente</Text>
        </View>
        <View style={styles.headerRight} />
      </View>
      <View style={[styles.signatureBox, { marginTop: 100 }]}>
        <Signature
          ref={signatureRef}
          onOK={handleOK}
          descriptionText="Assine abaixo"
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
        textColor="#7c1d1e"
        onPress={() => signatureRef.current?.clearSignature()}
      >
        Limpar Assinatura
      </Button>
      <Button
        buttonColor="#7c1d1e"
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
  signatureBox: {
    width: Dimensions.get("window").width - 48,
    height: 600,
    borderWidth: 2,
    borderRadius: 6,
    backgroundColor: "#fffde7",
    marginBottom: 24,
    overflow: "hidden",
    alignSelf: "center",
  },
  button: {
    marginTop: 8,
    alignSelf: "center",
    width: 200,
    borderRadius: 10,
  },
});
