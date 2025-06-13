import { AntDesign } from "@expo/vector-icons";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Modal, Platform, Pressable, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, FlatList, Button } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Cliente: { clienteId: string; clienteNome: string; clienteSaldo: number };
};

import * as Location from 'expo-location';

interface StatusLocation {
    locationServicesEnabled: boolean;
    backgroundModeEnabled: boolean;
    gpsAvailable?: boolean;
    networkAvailable?: boolean;
    passiveAvailable?: boolean;
    status: string
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
    const [clienteSelecionado, setClienteSelecionado] = useState<typeof cliente[0] | null>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const handleClientePress = (cliente: { id: string, nome: string, saldo: number }) => {
        navigation.navigate('Cliente', { clienteId: cliente.id, clienteNome: cliente.nome, clienteSaldo: cliente.saldo });
    };
    const [ currentLocation, setCurrentLocation ] = useState<Region | null>(null);
    // const [ hasLocationPermission, setHasLocationPermission ] = useState<boolean>(false)
    const [ error, setError ] = useState<string | null>("")
 

    const fetchCurrentLocation = useCallback(async () => {
        let { status } = await Location.getForegroundPermissionsAsync();

        if(status !== "granted") {
            setError("Permissão para acessar localização foi negada!")
            // setHasLocationPermission(false)
        }
            
        setCurrentLocation({
            latitude:  -1.407721233196371, // Exemplo: Latitude de Belém
            longitude: -48.471521664808094, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }, [])

    useEffect(() => {
        fetchCurrentLocation()


    }, [fetchCurrentLocation])
    
    


 


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
                  <Text>{item.nome}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisible(true)}>
                <AntDesign name="right" size={15} />
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
            </Text>
            <Pressable onPress={() => setVisible(false)}>
              <AntDesign name="closecircle" size={24} />
            </Pressable>
          </View>

          {clienteSelecionado && (
            <>
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
                <MapView.Marker
                  coordinate={{
                    latitude: clienteSelecionado.latitude,
                    longitude: clienteSelecionado.longitude,
                  }}
                  title={clienteSelecionado.nome}
                  description={clienteSelecionado.endereco}
                />
              </MapView>

              {/* Conteúdo do Cliente.tsx adaptado */}
              <View style={styles.detalhesCliente}>
                <Text style={styles.title} variant="titleLarge">
                  Detalhes do Cliente
                </Text>
                <Text>Código: {clienteSelecionado.id}</Text>
                <Text>Nome: {clienteSelecionado.nome}</Text>
                <Text>
                  Saldo atual: R${" "}
                  {Number(clienteSelecionado.saldo)
                    .toFixed(2)
                    .replace(".", ",")}
                </Text>
                <View style={styles.buttonContainer}>
                  <Button
                    mode="contained"
                    onPress={() => {
                      setVisible(false);
                      navigation.navigate("Pagamento", {
                        clienteId: clienteSelecionado.id,
                      });
                    }}
                  >
                    Ir para Pagamento
                  </Button>
                </View>
              </View>
            </>
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
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 1,
        backgroundColor: "#fff",
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

function getPermissionsAsync() {
    throw new Error("Function not implemented.");
}
