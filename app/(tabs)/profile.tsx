import { StyleSheet, Text, View } from "react-native";
import { SignOutButton } from "../components/SignOut";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
        <AntDesign name="user" size={80} />

        <SignOutButton />
    </View>
  );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 15
    }
})
