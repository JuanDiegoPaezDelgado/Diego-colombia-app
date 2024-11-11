import { View, Text } from "react-native";
import React from "react";
import { styles } from "../styles/Description.style";
import QRCode from "react-native-qrcode-svg";

const MyQr = () => {
  return (
    <View style={styles.bodystails}>
      <View style={styles.CentrarcodigoQR}>
        <QRCode value="https://github.com/JuanDiegoPaezDelgado/pgl-portfolio-app" />
      </View>
    </View>
  );
};

export default MyQr;
