import { StyleSheet } from "react-native";

const TimelineStyles = StyleSheet.create({
  tagModal: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute"
  },
  button: {
    height: 64,
    width: 64,
    borderRadius: 40,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center"
  },
  blueButton: {
    backgroundColor: "#579FFB"
  },
  icon: {
    transform: [{ scale: 1.2 }]
  },
  buttonText: {
    fontSize: 12,
    lineHeight: 12,
    fontFamily: "Metropolis-Bold",
    color: "#262628",
    marginHorizontal: 16
  }
});

export default TimelineStyles;
