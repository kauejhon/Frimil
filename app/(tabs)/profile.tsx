import { Image, StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper'
import { SignOutButton } from "../components/SignOut";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useUser } from "@clerk/clerk-expo";


export default function ProfileScreen() {
    const { user } = useUser()

    

  return (
    
    <View style={styles.container}>
       
        
        {/* <AntDesign name="user" size={80} /> */}
        <Image 
          alt={user?.primaryEmailAddress?.emailAddress}
          src={user?.imageUrl}
          width={200}
          height={200}
          style={styles.image}
        
        
        />
        <Text>{user?.firstName}</Text>
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
    },
    image: {
        borderRadius: 50
    }
})
