import { AntDesign } from "@expo/vector-icons";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Modal, Platform, Pressable, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, Button } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import * as Location from 'expo-location';
import { fetchCurrentLocation } from "@/src/functions";
import { ModalComp } from "../components/Modal";

interface StatusLocation {
    locationServicesEnabled: boolean;
    backgroundModeEnabled: boolean;
    gpsAvailable?: boolean;
    networkAvailable?: boolean;
    passiveAvailable?: boolean;
    status: string
}

export default function HomeScreen() {
    const [ currentLocation, setCurrentLocation ] = useState< Region | null>(null);
    // const [ hasLocationPermission, setHasLocationPermission ] = useState<boolean>(false)
    const [ error, setError ] = useState<string | null>("")
 

 
    useEffect(() => {
        fetchCurrentLocation(setError, setCurrentLocation)


    }, [fetchCurrentLocation])
    
    


 


  return (
    <ScrollView style={{backgroundColor: "#b6b6b6"}}>
        <View style={styles.container}>
            <ModalComp currentLocation={currentLocation}/>
            <ModalComp currentLocation={currentLocation}/>
            <ModalComp currentLocation={currentLocation}/>
            <ModalComp currentLocation={currentLocation}/>
            <ModalComp currentLocation={currentLocation}/>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingInline: 20,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight! + 20 : 50,
        
    }
})