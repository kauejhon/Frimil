import { AntDesign } from "@expo/vector-icons";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Modal, Platform, Pressable, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, Button } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
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
                    {/* { isLoadingLocation && <ActivityIndicator size={"large"} color="#000"/> } */}
                    {/* {!hasLocationPermission && (
                        <Button
                        title="Conceder Permissão de Localização"
                        onPress={requestLocationPermission}
                        />
                    )} */}
                    { currentLocation && (
                        <MapView 
                          style={styles.map} 
                          provider={PROVIDER_GOOGLE} 
                          initialRegion={currentLocation} 
                          scrollEnabled={false}
                          pitchEnabled={false}
                          rotateEnabled={false}

                        >
                            <Marker 
                             coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude
                             }}
                            
                            />
                        </MapView>

                    )}

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
