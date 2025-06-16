import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarActiveTintColor: "#7c1d1e",
          tabBarIcon: () => <AntDesign name="home" size={24} color="#7c1d1e" />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarActiveTintColor: "#7c1d1e",
          tabBarIcon: () => <AntDesign name="user" size={24} color="#7c1d1e" />,
        }}
      />
    </Tabs>
  );
}
