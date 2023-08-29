import { Platform, StyleSheet } from "react-native";

const OnboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebebeb"
  },
  backgroundHeader: {
    backgroundColor: "#fae75a",
    paddingLeft: "5%",
    paddingTop: "15%",
    zIndex: -1,
    height: "30%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  versionText: {
    fontFamily: "Metropolis-Regular",
    color: "#808080"
  },
  pageIndicator: {
    height: "15%",
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    height: "20%",
    backgroundColor: "transparent",
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  carouselContainer: {
    height: "55%",
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "center"
  },
  imageContainer: {
    backgroundColor: "white",
    width: "90%",
    alignItems: "center",
    paddingTop: 25
  },
  onboardingImage: {
    height: "100%",
    resizeMode: "contain",
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 16
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    ...Platform.select({
      android: {
        elevation: 17
      }
    })
  },
  button: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    padding: 20,
    alignItems: "center",
    color: "#ffffff",
    backgroundColor: "#2C2F2D",
    justifyContent: "center"
  },
  backIcon: {
    transform: [{ rotateZ: "-180deg" }],
    position: "absolute",
    right: 24
  },
  titleText: {
    fontSize: 20,
    fontFamily: "Metropolis-Medium",
    color: "#000000",
    marginBottom: 20,
    textAlign: "center"
  },
  paragraphText: {
    width: "60%",
    fontSize: 14,
    fontFamily: "Metropolis-Regular",
    textAlign: "center",
    color: "#262628",
    marginBottom: 4
  },
  paragraphBold: {
    width: "80%",
    fontFamily: "Metropolis-Bold"
  },
  buttonContainer: {
    height: "10%",
    alignItems: "center",
    width: "100%",
    bottom: 0
  },
  text: {
    fontFamily: "CircularStd-Book",
    fontSize: 12,
    color: "#FFFFFF"
  }
});

export default OnboardingStyles;
