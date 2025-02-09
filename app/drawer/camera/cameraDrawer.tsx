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
import { useRouter } from "expo-router";

const cameraDrawer = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastPicture, setLastPicture] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);
  const [isSavingImage, setIsSavingImage] = useState<boolean>(false);
  const router = useRouter();

  const loadImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.getAllImages();
      console.log("API getAllImages response:", response);
      console.log("API getAllImages response.data:", response.data);
      console.log(
        "API getAllImages response.data.object:",
        response.data.object
      );
      setImages(response.data.object);
      console.log("Images state updated:", response.data.object);
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
      const response = await ApiService.saveImage(
        base64ImageData,
        width,
        height
      );
      console.log("Imagen guardada exitosamente:", response);
      loadImages();
    } catch (err: any) {
      console.error("Error al guardar la imagen:", err);
      setError("Error al guardar la imagen. Inténtalo de nuevo.");
    } finally {
      setIsSavingImage(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingComponent message="Cargando imágenes..." />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error al cargar las imágenes:</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {selectedImage && (
        <View style={styles.fullScreenContainer}>
          <Image
            style={styles.fullScreenImage}
            source={{
              uri: `data:image/png;base64,${selectedImage.encodedData}`,
            }}
            resizeMode="contain"
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
            <TouchableOpacity onPress={() => setSelectedImage(item)}>
              <View style={styles.thumbnailContainer}>
                <Image
                  style={styles.thumbnail}
                  source={{ uri: `data:image/png;base64,${item.encodedData}` }}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {}
      {!isCameraVisible && (
        <Button
          title="Take a Picture"
          onPress={() => setIsCameraVisible(true)}
        />
      )}

      {isCameraVisible && (
        <>
          <View
            style={[
              styles.cameraContainer,
              !isCameraVisible && styles.cameraContainerHidden,
            ]}
          >
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
            source={{ uri: `data:image/jpg;base64,${lastPicture}` }}
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
  thumbnailContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 5,
    maxWidth: "30%",
  },
  thumbnail: {
    flex: 1,
    borderRadius: 8,
  },
  cameraContainer: {
    flex: 1,
    marginTop: 20,
  },
  cameraContainerHidden: {
    display: "none",
  },
  lastImageContainer: {
    width: 55,
    height: 55,
    position: "absolute",
    zIndex: 2,
    top: 10,
    right: 10,
    backgroundColor: "lightgray",
    display: "flex",
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

export default cameraDrawer;
