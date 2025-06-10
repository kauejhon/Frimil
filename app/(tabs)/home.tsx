import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Platform, Pressable, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Cliente: { clienteId: string; clienteNome: string; clienteSaldo: number };
};



const INITIAL_REGION = {
    latitude: -1.408808,
    longitude: -48.471563,
    latitudeDelta: 2,
    longitudeDelta: 2
}

export default function HomeScreen() {
    const [visible, setVisible] = useState<boolean>(false);
    const [cliente, setClientes] = useState([
        { id: "1", nome: "Casa do Beef", saldo: 12535.00, endereco: "Av. Brasil, 123" },
        { id: "2", nome: "Real Beef", saldo: 5342.00, endereco: "Av. São Paulo, 456" },
        { id: "3", nome: "Merc. Bragança Filho", saldo: 2345.00, endereco: "Rua das Flores, 789" },
        { id: "4", nome: "Portas Abertas", saldo: 1200.00, endereco: "Rua das Palmeiras, 101" },
        { id: "5", nome: "Nosso Frango", saldo: 6789.00, endereco: "Av. das Nações, 202" },
        { id: "6", nome: "Zé Maria", saldo: 8900.00, endereco: "Rua do Comércio, 303" },
        { id: "7", nome: "Mercantil Sodré", saldo: 4500.00, endereco: "Av. Central, 404" },
        { id: "8", nome: "Aç. Alvorada", saldo: 3200.00, endereco: "Rua da Liberdade, 505" },
        { id: "9", nome: "Tarcísio", saldo: 1500.00, endereco: "Av. das Américas, 606" },
        { id: "10", nome: "Regina", saldo: 7800.00, endereco: "Rua do Sol, 707" }
    ]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const handleClientePress = (cliente: { id: string, nome: string, saldo: number }) => {
        navigation.navigate('Cliente', { clienteId: cliente.id, clienteNome: cliente.nome, clienteSaldo: cliente.saldo });
    };


  return (
    <ScrollView>
        <View style={styles.container}>
            <View style={styles.containerChild}>
                <Text style={styles.title} variant="titleLarge">Cliente</Text>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <AntDesign name="pluscircle" size={24}/>
                </TouchableOpacity>
            </View>

            <FlatList
                data={cliente}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleClientePress(item)}>
                        <View style={styles.clienteItem}>
                            <Text>{item.nome}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                style={{ marginTop: 20 }}
            />
              
            <Modal
              visible={visible}
              animationType="fade"
              onRequestClose={() => setVisible(false)}
            
            >
                <View style={styles.containerModal}>
                    <View style={styles.childViewModal}>
                        <Text style={styles.titleModal} variant="titleLarge">Cliente</Text>
                        <Pressable onPress={() => setVisible(false)}>
                            <AntDesign name="closecircle" size={24}/>
                        </Pressable>
                    </View>

                    <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_REGION} showsUserLocation showsMyLocationButton={true}/>

                </View>
                

            </Modal>
            

        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        paddingInline: 20,
        
    },
    containerChild: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight! + 20 : 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }, 
    title: {
        color: "#000",
        fontWeight: "bold"
    },
    containerModal: {
        flex: 1,
    },
    childViewModal: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15
    },

    titleModal: {
        textAlign: "center",
        color: "#000",
        fontWeight: "bold"
    },
    map: {
        width: "100%",
        height: "50%",
    },
    clienteItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    }
})