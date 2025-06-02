import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return(
    <Tabs screenOptions={{headerShown: false}}> 
        <Tabs.Screen name="home" options={{  title: "Home", tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color}/> }}/>
        <Tabs.Screen name="profile" options={{ title: "Home", tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color}/> }}/>
    </Tabs>
    
  );
}
