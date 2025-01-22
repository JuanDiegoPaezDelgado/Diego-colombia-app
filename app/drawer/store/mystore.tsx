import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import uuid from "react-native-uuid";
import AddProductModal, { Product } from "../../addModal";
import AntDesign from "@expo/vector-icons/AntDesign";

const ShoppingListScreen = () => {
  const [products, setProducts] = useState([
    {
      id: uuid.v4(),
      nombre: "Pepinillos",
      categoría: "Frutas/Verduras",
      cantidad: 3,
      precio: 1.5,
      enCarrito: false,
    },
    {
      id: uuid.v4(),
      nombre: "cocacola",
      categoría: "Bebidas",
      cantidad: 1,
      precio: 2.0,
      enCarrito: false,
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const totalPrice = products.reduce(
    (total, product) =>
      product.enCarrito ? total + product.precio * product.cantidad : total,
    0
  );

  const productsInCart = products.filter((product) => product.enCarrito).length;

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const getCategoryImage = (category: string) => {
    switch (category) {
      case "Panaderia":
        return require("../../../assets/categorias/panaderia.jpg");
      case "Bebidas":
        return require("../../../assets/categorias/bebidas.jpg");
      case "Enlatados":
        return require("../../../assets/categorias/enlatados.jpg");
      case "Carnes":
        return require("../../../assets/categorias/carnes.jpg");
      case "Pescados":
        return require("../../../assets/categorias/pescados.jpg");
      case "Frutas/Verduras":
        return require("../../../assets/categorias/frutas.jpg");
      case "Otros":
        return require("../../../assets/categorias/otros.jpg");
      default:
        return null;
    }
  };

  const editProduct = (id: string, updatedProduct: Product) => {
    setProducts(
      products.map((product) => (product.id === id ? updatedProduct : product))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const toggleEnCarrito = (id: string) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, enCarrito: !product.enCarrito }
          : product
      )
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Lista de la Compras</Text>
          <View style={[styles.cartCounter]}>
            <AntDesign name="shoppingcart" size={24} color="black" />
            <Text style={styles.cartCounterText}>{productsInCart}</Text>
          </View>
        </View>

        <View>
          {products.length > 0 ? (
            <>
              <View style={{ height: 653 }}>
                <FlatList
                  style={{}}
                  data={products}
                  renderItem={({ item }) => (
                    <View
                      style={[
                        styles.product,
                        item.enCarrito && styles.productInCart,
                      ]}
                    >
                      <View>
                        <Image
                          source={getCategoryImage(item.categoría)}
                          style={styles.image}
                        />
                      </View>
                      <Text>
                        {item.nombre} - {item.categoría} - Cantidad:{" "}
                        {item.cantidad} Precio: {item.precio}€
                      </Text>
                      <Pressable
                        style={[
                          styles.button,
                          { backgroundColor: "orange", marginBottom: 5 },
                        ]}
                        onPress={() => toggleEnCarrito(item.id)}
                      >
                        <Text style={styles.buttonText}>
                          {item.enCarrito
                            ? "Quitar del Carrito"
                            : "Agregar al Carrito"}
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[
                          styles.button,
                          { backgroundColor: "orange", marginBottom: 5 },
                        ]}
                        onPress={() => deleteProduct(item.id)}
                      >
                        <Text style={styles.buttonText}>Borrar</Text>
                      </Pressable>
                      <Pressable
                        style={[
                          styles.button,
                          { backgroundColor: "orange", marginBottom: 5 },
                        ]}
                        onPress={() => {
                          setProductToEdit(item);
                          setModalVisible(true);
                        }}
                      >
                        <Text style={styles.buttonText}>Editar</Text>
                      </Pressable>
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                />
              </View>
              <View>
                <View>
                  <Text style={styles.totalPrice}>
                    Precio Total: {totalPrice.toFixed(2)}€
                  </Text>
                </View>

                <Pressable
                  style={[styles.buttonDelete, {}]}
                  onPress={() => setProducts([])}
                >
                  <Text style={styles.buttonText}>Borrar Todo</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, { backgroundColor: "green" }]}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.buttonText}>Añadir Producto</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <View>
              <Text style={styles.listaVaciaText}>La lista está vacía</Text>
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.buttonText}>AÑADIR PRODUCTO</Text>
              </Pressable>
            </View>
          )}
        </View>
        <AddProductModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setProductToEdit(null);
          }}
          Add={addProduct}
          productToEdit={productToEdit}
          Edit={editProduct}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  cartCounter: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    backgroundColor: "green",
    borderRadius: 20,
    padding: 10,
  },
  cartCounterText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonDelete: {
    color: "White",
    backgroundColor: "red",
    padding: 6,
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    borderStyle: "solid",
    backgroundColor: "green",
    padding: 9.7,
    color: "white",
    borderBottomLeftRadius: 7.5,
    borderBottomRightRadius: 7.5,
  },
  listaVaciaText: {
    textAlign: "center",
    alignSelf: "center",
    paddingTop: 238,
    fontSize: 50,
    color: "red",
    marginBottom: 330,
  },
  container: {
    flex: 1,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: "#E6E6FA",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    borderStyle: "solid",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  totalPrice: {
    fontSize: 18,
    width: 350,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 0,
    borderStyle: "solid",
    borderLeftWidth: 0,
    borderBottomWidth: 2,
    borderRightWidth: 0,
  },
  product: {
    padding: 10,
  },
  productInCart: {
    backgroundColor: "#ffec99",
    borderWidth: 1,
    fontSize: 20,
  },
  image: {
    width: 300,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default ShoppingListScreen;
