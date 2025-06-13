import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return(
    <Tabs screenOptions={{headerShown: false}}> 
        <Tabs.Screen name="home" options={{  title: "Home", tabBarActiveTintColor: "#3b0000",  tabBarIcon: () => <AntDesign name="home" size={24} color="#3b0000"/> }}/>

        <Tabs.Screen name="profile" options={{ title: "Profile", tabBarActiveTintColor: "#3b0000", tabBarIcon: () => <AntDesign name="user" size={24} color="#3b0000" /> }}/>
    </Tabs>
    
  );
}
