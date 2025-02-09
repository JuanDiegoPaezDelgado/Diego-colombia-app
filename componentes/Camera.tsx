import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";

type CameraProps = {
  setLastPicture: Function;
  onPictureTaken: (
    base64ImageData: string,
    width: number,
    height: number
  ) => void;
};

const Camera = ({ setLastPicture, onPictureTaken }: CameraProps) => {
  console.log("Camera Component Rendered");
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<boolean>(false);

  const toggleFacing = () =>
    setFacing((face) => (face === "back" ? "front" : "back"));

  const toggleFlash = () => setFlash((flash) => !flash);

  const takePicture = async () => {
    console.log("taking picture...");
    const picture = await cameraRef.current?.takePictureAsync({ base64: true });

    if (picture != null && picture.base64 != null) {
      setLastPicture(picture.base64);

      onPictureTaken(picture.base64, picture.width || 0, picture.height || 0);
    } else {
      alert("Ocurrió un error sacando una foto.");
    }
  };

  if (!permission) {
    return <View />;
  } else if (!permission.granted) {
    return (
      <Button onPress={requestPermission} title="Dar permisos de cámara" />
    );
  }

  return (
    <CameraView
      enableTorch={flash}
      style={styles.camera}
      facing={facing}
      mode="picture"
      ref={cameraRef}
      onCameraReady={() => console.log("Camera ready!")}
    >
      <View style={styles.buttonContainer}>
        <Pressable style={styles.iconButton} onPress={toggleFlash}>
          <Ionicons
            name={flash ? "flash-off" : "flash"}
            size={32}
            color="black"
          />
        </Pressable>
        <Pressable style={styles.pictureButton} onPress={takePicture}>
          <Text> </Text>
        </Pressable>
        <Pressable style={styles.iconButton} onPress={toggleFacing}>
          <Ionicons name="camera-reverse" size={32} color="black" />
        </Pressable>
      </View>
    </CameraView>
  );
};

export default Camera;

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "flex-end",
    justifyContent: "space-between",
    margin: 40,
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "50%",
    borderColor: "gray",
    borderWidth: 2,
    padding: 8,
  },
  pictureButton: {
    height: 80,
    width: 80,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "50%",
    borderColor: "gray",
    borderWidth: 6,
  },
});
