import { Platform, ScrollView, StatusBar, StyleSheet, View } from "react-native";

import { ModalComp } from "../components/Modal";
import { clients } from "@/data/dataClient";


export default function HomeScreen() {

  return (
    <ScrollView>
        <View style={styles.container}>
            {clients.map((props) => (
                <ModalComp key={props.name} name={props.name} currentLocation={props.currentLocation} />

            ))}
            
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        paddingInline: 20,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight! + 20 : 50,
        gap: 1,
    }
})