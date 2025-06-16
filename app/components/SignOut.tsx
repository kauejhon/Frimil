import { useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Button, Text } from "react-native-paper";

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

    


    return (
      <Button
        mode="contained"
        style={{ borderRadius: 10 }}
        buttonColor="#7c1d1e"
        onPress={handleSignOutPress}
      >
        <Text style={{ color: "#fff" }} variant="titleMedium">
          Sair da Conta
        </Text>
      </Button>
    );

    

}

