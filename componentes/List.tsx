import { Text, View } from "react-native";
import React from "react";
import { styles } from "../styles/List.styles";

export type CardProps = {
  text: string;
};

const Card = ({ text }: CardProps) => {
  return (
    <View>
      <Text style={styles.cosasQmeGustanMuxoEstails}>{text}</Text>
    </View>
  );
};

export default Card;
