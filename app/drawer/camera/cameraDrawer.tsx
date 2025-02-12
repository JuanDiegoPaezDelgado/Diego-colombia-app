import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import ApiService from "../../service/apiService";
import CameraComponent from "../../../componentes/Camera";
import LoadingComponent from "../../../componentes/LoadingComponent";

const CameraDrawer = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastPicture, setLastPicture] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);
  const [isSavingImage, setIsSavingImage] = useState<boolean>(false);

  const getImageUri = (base64Data: string) => {
    if (!base64Data) return "";

    const cleanBase64 = base64Data.replace(/[\r\n]/g, "").trim();
    console.log(cleanBase64.substring(0, 5));
    return `data:image/jpeg;base64,${cleanBase64}`;
  };

  const loadImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.getAllImages();
      console.log("Número de imágenes recibidas:", response.data.object.length);

      const validImages = response.data.object.map((img: any) => ({
        ...img,
        encodedData: img.encodedData.replace(/[\r\n]/g, ""),
      }));

      setImages(validImages);
      setLoading(false);
    } catch (err: any) {
      console.error("Error al cargar imágenes:", err);
      setError(err.message || "Error al cargar las imágenes.");
      setImages([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleSaveImage = async (
    base64ImageData: string,
    width: number,
    height: number
  ) => {
    setIsSavingImage(true);
    setError(null);
    setIsCameraVisible(false);

    try {
      const cleanBase64 = base64ImageData.replace(
        /^data:image\/\w+;base64,/,
        ""
      );
      await ApiService.saveImage(cleanBase64, width, height);
      await loadImages();
    } catch (err: any) {
      console.error("Error al guardar la imagen:", err);
      setError("Error al guardar la imagen. Inténtalo de nuevo.");
    } finally {
      setIsSavingImage(false);
    }
  };

  const handleImageClick = (image: any) => {
    console.log("Imagen seleccionada:", image);
    setSelectedImage(image);
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
        <View style={styles.fullScreenContainer}>
          <Image
            style={styles.fullScreenImage}
            source={{ uri: getImageUri(selectedImage.encodedData) }}
            resizeMode="contain"
            onError={(error) => {
              console.error("error al abrir en pantalla completa", error);
              setError("Error al cargar la imagen en pantalla completa");
            }}
          />
          <TouchableOpacity
            style={styles.closeIconContainer}
            onPress={() => setSelectedImage(null)}
          >
            <Text style={styles.closeIcon}>X</Text>
          </TouchableOpacity>
        </View>
      )}

      {images.length === 0 && !loading && !error && (
        <Text style={styles.message}>No hay imágenes guardadas.</Text>
      )}
      {images.length > 0 && (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleImageClick(item)}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.imageFrame}
                  source={{ uri: getImageUri(item.encodedData) }}
                  onError={(error) => {
                    console.error("Error loading image:", item.id, error);
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {!isCameraVisible && (
        <Button
          title="Take a Picture"
          onPress={() => setIsCameraVisible(true)}
        />
      )}

      {isCameraVisible && (
        <>
          <View style={styles.cameraContainer}>
            <CameraComponent
              setLastPicture={setLastPicture}
              onPictureTaken={handleSaveImage}
            />
          </View>
          <Button
            title="Close Camera"
            onPress={() => setIsCameraVisible(false)}
          />
        </>
      )}

      {isSavingImage && (
        <LoadingComponent
          message="Guardando imagen..."
          style={styles.savingIndicator}
        />
      )}

      <View style={styles.lastImageContainer}>
        {lastPicture && (
          <Image
            style={styles.lastImage}
            source={{ uri: getImageUri(lastPicture) }}
            onError={(error) => {
              console.error("Error loading last picture:", error);
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 5,
    maxWidth: "30%",
  },
  imageFrame: {
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
  cameraContainer: {
    flex: 1,
    marginTop: 20,
  },
  lastImageContainer: {
    width: 55,
    height: 55,
    position: "absolute",
    zIndex: 2,
    top: 10,
    right: 10,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  lastImage: {
    width: 48,
    height: 48,
  },
  fullScreenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  fullScreenImage: {
    width: "90%",
    height: "80%",
  },
  closeIconContainer: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 10,
    borderRadius: 20,
  },
  closeIcon: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  savingIndicator: {
    marginTop: 20,
  },
});

export default CameraDrawer;
