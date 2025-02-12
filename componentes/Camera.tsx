import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState, useCallback } from "react";
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
  const [isCapturing, setIsCapturing] = useState(false);

  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<boolean>(false);

  const toggleFacing = useCallback(
    () => setFacing((face) => (face === "back" ? "front" : "back")),
    []
  );

  const toggleFlash = useCallback(() => setFlash((flash) => !flash), []);

  const takePicture = async () => {
    if (isCapturing) return;

    try {
      setIsCapturing(true);
      console.log("Taking picture...");

      const picture = await cameraRef.current?.takePictureAsync({
        base64: true,
        quality: 0.8,
        imageType: "jpg",
        skipProcessing: false,
      });

      if (picture?.base64) {
        console.log("Picture taken successfully");
        console.log("Image dimensions:", {
          width: picture.width,
          height: picture.height,
        });
        console.log("Base64 data length:", picture.base64.length);

        const width = picture.width || 0;
        const height = picture.height || 0;

        if (width === 0 || height === 0) {
          throw new Error("Invalid image dimensions");
        }

        const base64Data = picture.base64.replace(
          /^data:image\/\w+;base64,/,
          ""
        );

        setLastPicture(base64Data);
        onPictureTaken(base64Data, width, height);
      } else {
        throw new Error("No base64 data received from camera");
      }
    } catch (error) {
      console.error("Error taking picture:", error);
      alert("Ocurrió un error al tomar la foto. Por favor, intenta de nuevo.");
    } finally {
      setIsCapturing(false);
    }
  };

  const handleCameraReady = useCallback(() => {
    console.log("Camera ready!");
  }, []);

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
      onCameraReady={handleCameraReady}
      format={{ photoFormat: "jpeg" }}
    >
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.iconButton}
          onPress={toggleFlash}
          disabled={isCapturing}
        >
          <Ionicons
            name={flash ? "flash-off" : "flash"}
            size={32}
            color={isCapturing ? "gray" : "black"}
          />
        </Pressable>
        <Pressable
          style={[
            styles.pictureButton,
            isCapturing && styles.pictureButtonDisabled,
          ]}
          onPress={takePicture}
          disabled={isCapturing}
        >
          <Text> </Text>
        </Pressable>
        <Pressable
          style={styles.iconButton}
          onPress={toggleFacing}
          disabled={isCapturing}
        >
          <Ionicons
            name="camera-reverse"
            size={32}
            color={isCapturing ? "gray" : "black"}
          />
        </Pressable>
      </View>
    </CameraView>
  );
};

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
    borderRadius: 50,
    borderColor: "gray",
    borderWidth: 2,
    padding: 8,
  },
  pictureButton: {
    height: 80,
    width: 80,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: "gray",
    borderWidth: 6,
  },
  pictureButtonDisabled: {
    opacity: 0.5,
    borderColor: "#ccc",
  },
});

export default Camera;
