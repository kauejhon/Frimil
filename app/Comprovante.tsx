import React from "react";
import { View, StyleSheet, Image, Share } from "react-native";
import { Text, Button } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function Comprovante() {
  const router = useRouter();
  // Recebe os parâmetros da navegação
  const { valor, assinatura, data } = useLocalSearchParams();

  // Gera o HTML do comprovante
  const html = `
    <div style="background:#fffbe6; padding:24px; font-family:sans-serif; border:2px solid #f7d358; border-radius:8px; width:320px;">
      <h2 style="color:#b7950b; text-align:center;">Comprovante de Pagamento</h2>
      <p><strong>Data:</strong> ${data}</p>
      <p><strong>Valor Recebido:</strong> R$ ${Number(valor).toFixed(2)}</p>
      <p><strong>Assinatura do Cliente:</strong></p>
      <img src="${assinatura}" style="width:100%;height:80px;object-fit:contain;border:1px solid #ccc;"/>
    </div>
  `;

  // Função para gerar e compartilhar o PDF
  const compartilharPDF = async () => {
    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri, { mimeType: "application/pdf" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.nota}>
        <Text style={styles.titulo}>Comprovante de Pagamento</Text>
        <Text>Data: {data}</Text>
        <Text>Valor Recebido: R$ {Number(valor).toFixed(2)}</Text>
        <Text style={{ marginTop: 16 }}>Assinatura do Cliente:</Text>
        <Image
          source={{ uri: assinatura as string }}
          style={styles.assinatura}
          resizeMode="contain"
        />
      </View>
      <Button mode="contained" style={styles.botao} onPress={compartilharPDF}>
        Compartilhar PDF
      </Button>
      <Button
        mode="outlined"
        style={styles.botao}
        onPress={() => router.back()}
      >
        Voltar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  nota: {
    backgroundColor: "#fffde7",
    borderColor: "#f7d358",
    borderWidth: 2,
    borderRadius: 8,
    padding: 24,
    width: 320,
    marginBottom: 32,
    alignItems: "center",
  },
  titulo: {
    color: "#b7950b",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  assinatura: {
    width: "100%",
    height: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 8,
    backgroundColor: "#fff",
  },
  botao: {
    marginTop: 8,
    width: 220,
    alignSelf: "center",
  },
});
