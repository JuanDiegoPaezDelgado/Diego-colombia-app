import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import uuid from "react-native-uuid";
import { Picker } from "@react-native-picker/picker";

export interface Product {
  id: string;
  nombre: string;
  categoría: string;
  cantidad: number;
  precio: number;
  enCarrito: boolean;
}
export type propTypes = {
  visible: boolean;
  onClose: () => void;
  Add: (product: Product) => void;
  productToEdit: Product | null;
  Edit: (id: string, updatedProduct: Product) => void;
};

const AddProductModal = ({
  visible,
  onClose,
  Add,
  productToEdit,
  Edit,
}: propTypes) => {
  const [nombre, setNombre] = useState("");
  const [categoría, setCategoría] = useState("Otros");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");

  useEffect(() => {
    if (productToEdit) {
      setNombre(productToEdit.nombre);
      setCategoría(productToEdit.categoría);
      setCantidad(String(productToEdit.cantidad));
      setPrecio(String(productToEdit.precio));
    }
  }, [productToEdit]);

  const clear = () => {
    setNombre("");
    setCategoría("Otros");
    setCantidad("");
    setPrecio("");
  };

  const handleAddOrEdit = () => {
    if (nombre && categoría && cantidad && precio) {
      const product = {
        id: productToEdit ? productToEdit.id : uuid.v4(),
        nombre,
        categoría,
        cantidad: parseInt(cantidad),
        precio: parseFloat(precio),
        enCarrito: false,
      };
      if (productToEdit) {
        Edit(productToEdit.id, product);
      } else {
        Add(product);
      }
      clear();
      onClose();
    }
  };

  return (
    <Modal visible={visible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>
          {productToEdit ? "Editar Producto" : "Añadir Producto"}
        </Text>
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
        <View style={styles.input}>
          <Picker
            selectedValue={categoría}
            onValueChange={(itemValue) => setCategoría(itemValue)}
          >
            <Picker.Item label="Panaderia" value="Panaderia" />
            <Picker.Item label="Bebidas" value="Bebidas" />
            <Picker.Item label="Enlatados" value="Enlatados" />
            <Picker.Item label="Carnes" value="Carnes" />
            <Picker.Item label="Pescados" value="Pescados" />
            <Picker.Item label="Frutas/Verduras" value="Frutas/Verduras" />
            <Picker.Item label="Otros" value="Otros" />
          </Picker>
        </View>

        <TextInput
          placeholder="Cantidad"
          value={cantidad}
          onChangeText={setCantidad}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Precio"
          value={precio}
          onChangeText={setPrecio}
          style={styles.input}
          keyboardType="numeric"
        />
        <Pressable
          style={[styles.pressableButton, styles.addButton]}
          onPress={handleAddOrEdit}
        >
          <Text style={styles.buttonText}>
            {productToEdit ? "Guardar Cambios" : "Añadir Producto"}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.pressableButton, styles.cancelButton]}
          onPress={() => {
            clear();
            onClose();
          }}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignSelf: "center",
    verticalAlign: "middle",
    backgroundColor: "#E6E6FA",
    width: "70%",
    marginTop: 200,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  pressableButton: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "green",
  },
  cancelButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default AddProductModal;
