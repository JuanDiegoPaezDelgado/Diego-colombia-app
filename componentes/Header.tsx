import React from "react";
import { View, Text, Pressable, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/Header.styles";
import { headerData } from "../Data/DataHeader";

const Header = () => {
  return (
    <View style={styles.topContainer}>
      <Text style={styles.firsttoprowContainer}>{headerData[0].text}</Text>
      <View style={styles.rowTopSecondContainer}>
        <Text style={[styles.bar, styles.shadoxboxing]}>
          {headerData[2].text}
        </Text>

        {
          <Pressable style={styles.darkicon}>
            <Ionicons name="contrast" size={24} color="black" />
          </Pressable>
        }
      </View>
    </View>
  );
};

export default Header;
