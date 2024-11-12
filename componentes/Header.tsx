import React from "react";
import { View, Text, Image } from "react-native";

import { headerData } from "../Data/DataHeader";
import { descriptionData } from "../Data/DescriptionData";
import { styles } from "../styles/Header.styles";

const Header = () => {
  return (
    <View style={styles.topContainer}>
      <Text style={styles.firsttoprowContainer}>{headerData[0].text}</Text>
      <View style={styles.rowTopSecondContainer}>
        <View style={styles.container}>
          <Image style={styles.avatar} source={descriptionData.image} />
          <View style={styles.card}>
            <Text style={styles.title}>{descriptionData.title}</Text>
            <Text>{descriptionData.description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
