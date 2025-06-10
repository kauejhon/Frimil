import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return(
    <Tabs screenOptions={{headerShown: false}}> 
        <Tabs.Screen name="home" options={{  title: "Início", tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color}/> }}/>
        <Tabs.Screen name="settings" options={{ title: "Configurações", tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color={color}/> }}/>
    </Tabs>
    
  );
}
