import { ClientProps, clients } from "@/data/dataClient";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, ScrollView, TouchableOpacity, View, StyleSheet, Pressable, StatusBar, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Text } from "react-native-paper"


export function ModalComp({ name, currentLocation }: ClientProps) {
    
    const [ visible, setVisible ] = useState<boolean>(false)

    return(
        <View>
            
            <View style={[styles.containerChild]}>
                        <Text style={styles.title} variant="titleLarge">
                            {name}
                        </Text>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <AntDesign name="right" size={24}/>
                </TouchableOpacity>
            </View>


            <Modal
            visible={visible}
            animationType="fade"
            onRequestClose={() => setVisible(false)}
            >

                <View style={styles.containerModal}>
                    <View style={styles.childViewModal}>
                        <Text style={styles.titleModal} variant="titleLarge">
                            {name}
                        </Text>
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
                    latitude: currentLocation!.latitude,
                    longitude: currentLocation!.longitude
                    }}

                    />
                    </MapView>


                </View>


            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    containerChild: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,

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
