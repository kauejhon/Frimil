import { useClerk, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";

export function SignOutButton() {

    const { signOut } = useClerk()


    async function handleSignOutPress() {
        try{
            await signOut()
            
            Linking.openURL(Linking.createURL("/(auth)/login"))

        } catch(err) {
            console.error(JSON.stringify(err, null, 2));

        }        
    }

    


    return(
        <Button  
          mode="contained" 
          buttonColor="#3b0000" 
          onPress={handleSignOutPress}
          >
            <Text style={{ color: "#fff" }} variant="titleMedium">Sair da Conta</Text>
        </Button>
       
    )

    

}


// const styles = StyleSheet.create({
//     btnText: {
//         color: "#fff"
//     }
// })

