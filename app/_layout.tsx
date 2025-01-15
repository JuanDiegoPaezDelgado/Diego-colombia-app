import { Drawer } from "expo-router/drawer";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function RootLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="welcomepage"
        options={{
          headerShown: true,
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="store/mystore"
        options={{
          headerShown: true,
          drawerIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" size={24} color="black" />
          ),
          title: "Store",
        }}
      />

<Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: true,
          drawerIcon: ({ color, size }) => (
            <Entypo name="list" size={24} color="black" />
          ),
          title: "My Portfolio",
        }}
      />
      
    </Drawer>
  );
}