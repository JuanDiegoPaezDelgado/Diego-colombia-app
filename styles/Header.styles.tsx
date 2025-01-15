import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  topContainer: {
    height: "25%",
    paddingTop: 0,// subir si se usa stack
    width: "100%",
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 100,
  },
  firsttoprowContainer: {
    backgroundColor: "#E6E6FA",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 1,
    width: "100%",
  },
  darkfirsttoprowContainer: {
    backgroundColor: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  rowTopSecondContainer: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "#E6E6FA",
    borderTopWidth: 0,
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
  },
  darkRowTopSecondContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    borderBottomWidth: 1,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "120%",
    gap: 20,
  },
  card: {
    backgroundColor: "#E6E6FA",
    padding: 5,
    borderRadius: 10,
    width: "54%",
    borderColor: "orange",
    borderWidth: 1,
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    color: "blue",
  },
});
