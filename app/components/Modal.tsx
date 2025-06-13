import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, ScrollView, TouchableOpacity, View, StyleSheet, Pressable, StatusBar, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Text } from "react-native-paper"

interface PropsMaps {
    currentLocation: Region | null
}

export function ModalComp({ currentLocation }: PropsMaps) {
    const [ visible, setVisible ] = useState<boolean>(false)
    return(
        <ScrollView>
            <View style={[styles.containerChild, styles.shadowProps]}>
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

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerChild: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 20,
        marginBottom: 35

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
    shadowProps: {
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 7,
        },
        shadowOpacity:  0.21,
        shadowRadius: 7.68,
        elevation: 10
    }
})
