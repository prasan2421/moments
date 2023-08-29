import { StyleSheet } from "react-native";

const ExpandableDivStyles = StyleSheet.create({
  tagContainer: {
    width: "97%",
    flexDirection: "row",
    marginBottom: "2%",
    height: 150,
    marginLeft: "3%"
  },
  animatedView: {
    marginBottom: "3%",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 150,
    borderRadius: 70
  },
  innerTagContainer: {
    paddingVertical: 20,
    justifyContent: "space-around",
    marginLeft: "12%"
  },
  name: {
    fontSize: 24,
    paddingBottom: "5%"
  },
  textContainer: {
    fontSize: 14,
    paddingRight: "10%"
  },
  detail: {
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  detailName: {
    color: "#FFFFFF"
  },
  expander: {
    paddingTop: "10%",
    marginRight: "7%"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "49%",
    height: 150
  },
  button: {
    height: 150,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    width: "47%",
    marginLeft: "3%"
  },
  editButton: {
    backgroundColor: "#808080"
  },
  deleteButton: {
    backgroundColor: "rgb(255,106,113)"

    //backgroundColor: "#d54849"
  }
});

export default ExpandableDivStyles;
