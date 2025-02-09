import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import ApiService from "../../service/apiService";

const cameraDrawer = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ApiService.getAllImages();
        setImages(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error al cargar imágenes:", err);
        setError(err.message || "Error al cargar las imágenes.");
        setImages([]);
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Cargando imágenes...</Text>
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
      {images.length === 0 ? (
        <Text style={styles.message}>No hay imágenes guardadas.</Text>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.thumbnailContainer}>
              <Image
                style={styles.thumbnail}
                source={{ uri: `data:image/png;base64,${item.encodedData}` }}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    aspectRatio: 1, // Para que sean cuadrados
    margin: 5,
    maxWidth: "30%", // Ajusta según necesites
  },
  thumbnail: {
    flex: 1,
    borderRadius: 8,
  },
});

export default cameraDrawer;
