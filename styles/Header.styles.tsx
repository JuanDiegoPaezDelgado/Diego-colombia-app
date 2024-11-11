import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  topContainer: {
    height: "14.8%",
    paddingTop: 50,
    width: "100%",
  },
  darkicon: {
    marginLeft: 50,
    borderWidth: 2,
    borderColor: "black",
  },
  firsttoprowContainer: {
    backgroundColor: "lightgray",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  darkfirsttoprowContainer: {
    backgroundColor: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  rowTopSecondContainer: {
    flexDirection: "row",
    backgroundColor: "darkgray",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    borderBottomWidth: 2,
  },
  darkRowTopSecondContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    borderBottomWidth: 2,
  },
  buttonruta: {
    width: "50%",
  },
  shadoxboxing: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  bar: {
    color: "black",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginLeft: 50,
  },
  darkbutton: {
    color: "black",
  },
});
