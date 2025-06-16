import { ClientProps } from "@/data/dataClient";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, TouchableOpacity, View, StyleSheet, Pressable } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Text, Button } from "react-native-paper"
import { useRouter } from "expo-router";


export function ModalComp({ name, currentLocation, saldo, codigo }: ClientProps) {
    
    const [visible, setVisible] = useState<boolean>(false)
    const router = useRouter();

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.containerChild}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.title}>{name}</Text>
          <AntDesign name="right" size={20} />
        </TouchableOpacity>

        <Modal
          visible={visible}
          animationType="fade"
          onRequestClose={() => setVisible(false)}
        >
          <View style={styles.containerModal}>
            <View style={styles.childViewModal}>
              <Text style={styles.titleModal}>{name}</Text>
              <Pressable onPress={() => setVisible(false)}>
                <AntDesign name="closecircle" size={24} />
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
                  longitude: currentLocation!.longitude,
                }}
              />
            </MapView>
            
            <Text style={{ fontSize: 28, fontWeight: "bold", marginVertical: 16, textAlign: "center" }}>Detalhes do Cliente</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>Código: {codigo}</Text>
              <Text style={styles.detailText}>Nome: {name}</Text>
              <Text style={styles.detailText}>
                Saldo Atual:{" "}
                {saldo.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                icon={() => (
                  <AntDesign name="creditcard" size={24} color="#fff" />
                )}
                mode="contained"
                onPress={() =>
                  router.push({
                    pathname: "/Pagamento",
                    params: { codigo, name, saldo },
                  })
                }
                buttonColor="#7c1d1e"
                contentStyle={{ flexDirection: "row-reverse" }}
                labelStyle={{ fontSize: 18 }}
                style={{borderRadius: 10}}
              >
                Ir para Pagamento
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        paddingInline: 10,
        
    },
    containerChild: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 25,

    }, 
    title: {
        color: "#000",
        fontSize: 16,
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
        fontWeight: "bold",
        fontSize: 24,
    },
    map: {
        width: "100%",
        height: "30%",
    },
    detailsContainer: {
        alignItems: "flex-start",
        marginTop: 32,
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    detailText: {
        fontSize: 22,
        color: "#222",
        marginBottom: 8,
        textAlign: "right",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: "center",
    },
})
