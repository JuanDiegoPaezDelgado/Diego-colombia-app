import { View, Text, Image, FlatList } from "react-native";
import React from "react";

import { styles } from "../styles/Description.style";
import { cardsData, dontLikeCardsData } from "../Data/Data";
import Card from "./Card";

const DescriptionCard = () => {
  return (
    <>
      <View style={styles.bodystails}>
        <View>
          <Text style={styles.titleText}>Cosas que me gustan mucho:</Text>
          <FlatList
            style={{ height: 500 }}
            data={cardsData}
            renderItem={({ item }) => <Card text={item.text} />}
          />
          <Text style={styles.titleText}>Cosas que no me gustan mucho:</Text>
          <FlatList
            style={{ height: 750 }}
            data={dontLikeCardsData}
            renderItem={({ item }) => <Card text={item.text} />}
          />
        </View>
      </View>
    </>
  );
};

export default DescriptionCard;
