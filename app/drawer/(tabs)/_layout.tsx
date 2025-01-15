import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

/*los parentesis de tabs son para que no salga en la url */
export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="hobbies"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="list" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="qrpage"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="qrcode" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};
