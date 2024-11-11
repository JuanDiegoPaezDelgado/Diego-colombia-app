import { Text, View } from "react-native";
import React from "react";
import { styles } from "../styles/List.styles";

export type CardProps = {
  text: string;
  isDarkMode: boolean;
};

const Card = ({ text, isDarkMode }: CardProps) => {
  return (
    <View>
      <Text
        style={
          isDarkMode
            ? styles.cosasQmeGustanMuxoEstails
            : styles.darkcosasQmeGustanMuxoEstails
        }
      >
        {text}
      </Text>
    </View>
  );
};

export default Card;
