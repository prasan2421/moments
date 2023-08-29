import { StyleSheet } from "react-native";

const PreviewStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff"
  },
  fullscreen: {
    height: "85%",
    width: "100%",
    paddingBottom: 30,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    zIndex: 1000
  },
  annotationContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff"
  },
  searchContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#262628"
  },
  itemContainer: {
    marginTop: 10,
    height: 270
  },
  videoContainer: {
    width: "100%",
    //height: '40%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    aspectRatio: 1
  },
  screenControllContainer: {},
  progress: {
    position: "absolute",
    top: 0,
    left: 0
  },
  seekBarAnnotation: {
    alignItems: "center",
    height: 10,
    marginLeft: 0,
    marginRight: 0,
    zIndex: 5,
    marginTop: -50,
    flexGrow: 1,
    flexDirection: "row",
    paddingHorizontal: 20
  },
  seekBar: {
    alignItems: "center",
    height: 20,
    marginLeft: 0,
    marginRight: 0,
    zIndex: 1000,
    flexGrow: 1,
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: 4
  },
  seekBarProgress: {
    height: "100%",
    backgroundColor: "#579FFB",
    marginTop: -8
  },
  horizontalTagMarker: {
    position: "absolute",
    backgroundColor: "#f2e37f",
    height: "100%",
    width: 3,
    top: 0,
    opacity: 0.8
  },
  seekBarRemains: {
    height: "100%",
    backgroundColor: "#848c90",
    marginTop: -8
  },
  seekBarProgressAnnotation: {
    height: 10,
    backgroundColor: "#579FFB"
  },
  seekHitPoint: {
    paddingHorizontal: 80,
    position: "absolute",
    left: -85,
    top: -8,
    marginTop: 0,
    zIndex: 1000,
    justifyContent: "center"
  },
  seekBarKnob: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderColor: "#000",
    borderWidth: 3,
    transform: [{ scale: 0.8 }],
    zIndex: 1000
  },
  seekBarBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    height: "100%"
  },
  seekBarBackgroundAnnotation: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    height: 10
  },
  activeTab: {
    color: "rgba(0, 0, 0, 1)"
  },
  inactiveTab: {
    color: "rgba(0, 0, 0, 0.4)",
    fontFamily: "Metropolis-Medium"
  },
  activeTabPreview: {
    color: "rgba(0, 0, 0, 1)"
  },
  timeContainer: {
    borderRadius: 5,
    paddingHorizontal: 3,
    //marginTop: 0,
    paddingVertical: 4,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center"
  },
  timeText: {
    color: "white",
    fontFamily: "Metropolis-Regular",
    fontSize: 14
  },
  tagButton: {
    color: "#FFFFFF",
    fontFamily: "Metropolis-Bold"
  },
  tagText: {
    color: "#FFFFFF",
    fontFamily: "Metropolis-Regular",
    textTransform: "uppercase",
    paddingLeft: 5,
    paddingRight: 5
  }
});

export default PreviewStyles;
