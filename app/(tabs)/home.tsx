import { AntDesign } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { Alert, Modal, Platform, Pressable, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, Button } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
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
    const [ visible, setVisible ] = useState<boolean>(false)
    const [ currentLocation, setCurrentLocation ] = useState<Location.LocationObject | null>(null);
    const [ hasLocationPermission, setHasLocationPermission ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>("")
    const [ isLoadingLocation, setIsLoadingLocation ] = useState<boolean>(false)


    const fetchCurrentLocation = useCallback(async () => {
        setIsLoadingLocation(true)

        try {
            let { status }: StatusLocation = await Location.getProviderStatusAsync() as StatusLocation;

            if(status === "granted") {
                setHasLocationPermission(true);
                setError(null)
                let userLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                setCurrentLocation(userLocation)
            } else {
                setHasLocationPermission(false);
                setError("Permissão não foi concedida. Por favor, habilite-a nas configurações do aplicativo.")
                setCurrentLocation(null)
            }

        } catch(err) {
                console.log(err)
                setError("Permissão para acessar a localização foi negada");

        } finally {
            setIsLoadingLocation(false)
        }
            
    }, [])

    useEffect(() => {
        fetchCurrentLocation()


    }, [fetchCurrentLocation])
    
    const requestLocationPermission = async () => {
        setIsLoadingLocation(true)
        let { status } = await Location.getForegroundPermissionsAsync();
        
        if(status === "granted") {
            setHasLocationPermission(true)
            setError(null)

            fetchCurrentLocation();

        } else {
            setHasLocationPermission(false)
            setError("Permissão para acessar a localização foi negada")
            Alert.alert(
            "Permissão Necessária",
            "Para mostrar sua localização no mapa, precisamos da sua permissão. Por favor, habilite-a nas configurações do aplicativo.",
            [{ text: "OK" }]
        );
        setIsLoadingLocation(false)
        }
    }

    if(error) {
        setError("Localização invalida")
    } else if(currentLocation) {
        let text = `Latitude: ${currentLocation.coords.latitude}, Longitude: ${currentLocation.coords.longitude}`
    }

    let displayText;
    if(isLoadingLocation) {
        displayText = "Carregando Localização"
    }

    const INITIAL_REGION = {

        latitude: currentLocation?.coords.latitude,
        longitude: currentLocation?.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    } as undefined | Region


  return (
    <ScrollView>
        <View style={styles.container}>
            <View style={styles.containerChild}>
                <Text style={styles.title} variant="titleLarge">Cliente</Text>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <AntDesign name="pluscircle" size={24}/>
                </TouchableOpacity>
            </View>

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
                    { isLoadingLocation && <ActivityIndicator size={"large"} color="#000"/> }
                    {!hasLocationPermission && !isLoadingLocation && (
                        <Button
                        title="Conceder Permissão de Localização"
                        onPress={() => requestLocationPermission}
                        />
                    )}
                    { hasLocationPermission || !isLoadingLocation ? (
                        <MapView 
                          style={styles.map} 
                          provider={PROVIDER_GOOGLE} 
                          initialRegion={ currentLocation ? INITIAL_REGION : {
                            latitude: -1.4558, // Exemplo: Latitude de Belém
                            longitude: -48.5039, // Exemplo: Longitude de Belém
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          }} 
                          showsUserLocation={hasLocationPermission && !!currentLocation} 
                          showsMyLocationButton={true}
                     
                        />

                    ) : <Text>Mapa indisponivel por falta de permissão</Text> }

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
    }
})

function getPermissionsAsync() {
    throw new Error("Function not implemented.");
}
