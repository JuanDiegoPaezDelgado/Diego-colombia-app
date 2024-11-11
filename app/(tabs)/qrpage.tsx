import { View, Text } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";

const MyQr = () => {
  return (
    <View style={{ justifyContent: "center" }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <QRCode value="https://github.com/JuanDiegoPaezDelgado" />
      </View>
    </View>
  );
};

export default MyQr;
