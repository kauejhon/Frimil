import { Platform, ScrollView, StatusBar, StyleSheet, View, Text } from "react-native";

import { ModalComp } from "../components/Modal";
import { clients } from "@/data/dataClient";


export default function HomeScreen() {

  return (
    <View style={{ flex:1 }}>
          <View style={styles.headerBar}>
                <Text style={styles.titleHome}>Clientes</Text>
          </View>
    <ScrollView>
        <View style={styles.container}>
            {clients.map((props) => (
                <ModalComp key={props.name} name={props.name} currentLocation={props.currentLocation} saldo={props.saldo} codigo={props.codigo} />

            ))}
            
        </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingInline: 10,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight! + 10 : 50,
        marginBottom: 20,
        gap: 1,
    },
    titleHome: {
        color: "#000",
        fontWeight: "bold",
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight! + 15 : 50,
        fontSize: 22,
    },
    headerBar: {
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        paddingBottom: 15,
        borderBottomColor: "#eee",
        backgroundColor: "#fff",
        alignItems: "center",
      },
})