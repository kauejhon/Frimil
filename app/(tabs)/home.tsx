import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Platform, Pressable, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker} from "react-native-maps";
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
    const [clienteSelecionado, setClienteSelecionado] = useState<any>(null);
    const [cliente, setClientes] = useState([
        { id: "1", nome: "Casa do Beef", saldo: 12535.00, endereco: "Av. Brasil, 123", latitude: -1.3885227,longitude: -48.3815667 },
        { id: "2", nome: "Real Beef", saldo: 5342.00, endereco: "Av. São Paulo, 456", latitude: -1.3490264, longitude: -48.3618332 },
        { id: "3", nome: "Merc. Bragança Filho", saldo: 2345.00, endereco: "Rua das Flores, 789", latitude: -1.3864547, longitude: -48.3732227 },
        { id: "4", nome: "Portas Abertas", saldo: 1200.00, endereco: "Rua das Palmeiras, 101", latitude: -1.3678369, longitude: -48.4364861 },
        { id: "5", nome: "Nosso Frango", saldo: 6789.00, endereco: "Av. das Nações, 202", latitude: -1.3419743, longitude: -48.3655206 },
        { id: "6", nome: "Zé Maria", saldo: 8900.00, endereco: "Rua do Comércio, 303", latitude: -1.3489085, longitude: -48.3619597 },
        { id: "7", nome: "Mercantil Sodré", saldo: 4500.00, endereco: "Av. Central, 404", latitude: 1.4031424, longitude: -48.3743574 },
        { id: "8", nome: "Aç. Alvorada", saldo: 3200.00, endereco: "Rua da Liberdade, 505", latitude: -1.3465107, longitude:-48.3367617 },
        { id: "9", nome: "Tarcísio", saldo: 1500.00, endereco: "Av. das Américas, 606", latitude: -1.4671881, longitude: -48.4690816 },
        { id: "10", nome: "Regina", saldo: 7800.00, endereco: "Rua do Sol, 707", latitude: -1.3572427, longitude: -48.3997657 }
    ]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const handleClientePress = (cliente: { id: string, nome: string, saldo: number }) => {
        navigation.navigate('Cliente', { clienteId: cliente.id, clienteNome: cliente.nome, clienteSaldo: cliente.saldo });
    };
    const handleAbrirMapa = (cliente: any) => {
        setClienteSelecionado(cliente);
        setVisible(true);
    };


    return (
      
          <View style={styles.container}>
              <Text style={styles.title} variant="titleLarge">
                  Clientes
              </Text>
          <View style={styles.containerChild}>
            <FlatList         
              data={cliente}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.clientList}>
                  <TouchableOpacity onPress={() => handleClientePress(item)}>
                    <View style={styles.clienteItem}>
                      <Text>
                        {item.nome}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleAbrirMapa(true)}>
                    <AntDesign name="pluscircle" size={24} />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>

          <Modal
            visible={visible}
            animationType="fade"
            onRequestClose={() => setVisible(false)}
          >
            <View style={styles.containerModal}>
              <View style={styles.childViewModal}>
                <Text style={styles.titleModal} variant="titleLarge">
                  {clienteSelecionado?.nome || "Cliente"}
                  Cliente
                </Text>
                <Pressable onPress={() => setVisible(false)}>
                  <AntDesign name="closecircle" size={24} />
                </Pressable>
              </View>

              {clienteSelecionado && (
                  <MapView
                      style={styles.map}
                      provider={PROVIDER_GOOGLE}
                      initialRegion={{
                        latitude: clienteSelecionado.latitude,
                        longitude: clienteSelecionado.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                      }}
                      showsUserLocation
                      showsMyLocationButton={true}
                  >
              
                      <MapView>
                          <Marker
                          coordinate={{
                            latitude: clienteSelecionado.latitude,
                            longitude: clienteSelecionado.longitude,
                          }}
                          title={clienteSelecionado.nome}
                          description={clienteSelecionado.endereco}
                          />
                      </MapView>
                  </MapView>  
              )}
            </View>
          </Modal>
        </View>
    
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        paddingInline: 20,
        
    },
    containerChild: {
        flex: 1,
        // marginTop: Platform.OS === "android" ? StatusBar.currentHeight! + 20 : 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    clientList: {
        flex: 1,
        marginTop: 20,
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    title: {
        color: "#000",
        fontWeight: "bold",
        marginTop: 20,
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
    }
})