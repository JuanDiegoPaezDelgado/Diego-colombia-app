import { Drawer } from "expo-router/drawer";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function RootLayout() {

  return (
    <GestureHandlerRootView style={{ flex: 1, marginTop: "-8%"}}>
    <Drawer>
          <Drawer.Screen
            name="welcomepage"
            options={{
              headerShown: false,
              drawerIcon: () => (
                <FontAwesome name="home" size={24} color="black" />
              ),
              title: "Home",
            }}
          />
          <Drawer.Screen
            name="store/mystore"  
            options={{
              headerShown: false,
              drawerIcon: () => (
                <AntDesign name="shoppingcart" size={24} color="black" />
              ),
              title: "Store",
            }}
          />
    
    <Drawer.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              drawerIcon: () => (
                <Entypo name="list" size={24} color="black" />
              ),
              title: "My Portfolio",
              
            }}
          />
          
        </Drawer>
    
      </GestureHandlerRootView>
  );
}