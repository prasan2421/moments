import { StyleSheet } from "react-native";

const GalleryStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ececec"
  },
  searchContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#808080"
  },
  itemContainer: {
    marginTop: 10,
    height: 270
  },
  imageContainer: {
    flex: 6,
    height: "100%",
    backgroundColor: "#4a4a4a"
  },
  descriptionContainer: {
    flex: 2,
    height: "100%",
    backgroundColor: "#ffffff",
    justifyContent: "space-around",
    paddingLeft: "5%"
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "space-between",
    paddingLeft: "10%"
  },
  optionsButton: {
    height: "100%",
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: "5%"
  },
  description: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "10%"
  },
  buttonContainer: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    height: "100%",
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 0, 0, 0.25)"
  },
  button: {
    width: 54,
    alignItems: "center",
    justifyContent: "center"
  },
  tagIcon: {
    height: "100%",
    width: "60%",
    borderRadius: 10
  },
  tagLandscape: {
    height: "60%"
  },
  descriptionItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  descriptionItemText: {
    marginLeft: "5%",
    color: "#262628",
    fontSize: 11,
    lineHeight: 11,
    fontFamily: "Metropolis-Medium"
  },
  descriptionText: {
    fontFamily: "Metropolis-Medium",
    fontSize: 18,
    lineHeight: 18,
    color: "#FFFFFF"
  },
  activityLoader: {
    height: "100%",
    paddingBottom: 55
  },
  scrollContainer: {
    width: "100%",
    height: "auto",
    paddingLeft: "2.5%",
    paddingRight: "2.5%",
    marginBottom: 65
  },
  galleryInput: {
    paddingTop: "4%",
    paddingBottom: "2%",
    marginBottom: "7%",
    borderBottomColor: "rgba(255,255,255,0.15)",
    borderBottomWidth: 1,
    width: "100%",
    alignSelf: "center",
    fontSize: 20,
    color: "#fff"
  }
});

export default GalleryStyle;
