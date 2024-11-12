import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { descriptionData } from "../Data/DescriptionData";
import { styles } from "../styles/Description.style";
import { cardsData, dontLikeCardsData } from "../Data/Data";
import Card from "./List";

const DescriptionCard = () => {
  return (
    <>
      <View style={styles.bodystails}>
        <View>
          <View style={styles.container}>
            <Image style={styles.avatar} source={descriptionData.image} />
            <View style={styles.card}>
              <Text style={styles.title}>{descriptionData.title}</Text>
              <Text>{descriptionData.description}</Text>
            </View>
          </View>

          <Text style={styles.titleText}>Cosas que me gustan mucho:</Text>
          <FlatList
            data={cardsData}
            renderItem={({ item }) => <Card text={item.text} />}
          />
          <Text style={styles.titleText}>Cosas que no me gustan mucho:</Text>
          <FlatList
            data={dontLikeCardsData}
            renderItem={({ item }) => <Card text={item.text} />}
          />
        </View>
      </View>
    </>
  );
};

export default DescriptionCard;
