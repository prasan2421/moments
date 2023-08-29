import { StyleSheet } from "react-native";

const RegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  content: {
    width: "100%"
  },

  input: {
    fontFamily: "CircularStd-Book",
    width: "85%",
    height: 55,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    flexDirection: "row",
    alignItems: "center"
  },
  textInputComponent: {
    width: "60%",
    paddingHorizontal: 20
  },
  inputLabelContent: {
    width: "40%"
  },

  inputLabel: {
    width: "85%",
    alignItems: "flex-end"
  },

  inputText: {
    fontFamily: "CircularStd-Book",
    color: "rgba(38, 38, 40, 0.4)",
    fontSize: 11,
    letterSpacing: 0.3
  },

  button: {
    flex: 1,
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#2C2F2D"
  },

  buttonContainer: {
    height: "10%",
    alignItems: "center",
    width: "100%"
  },

  text: {
    fontFamily: "CircularStd-Book",
    fontSize: 12,
    color: "#FFFFFF"
  },

  error: {
    borderColor: "#EF4131"
  }
});

export default RegisterStyles;
