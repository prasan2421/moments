import { Platform, StyleSheet } from "react-native";

const ResetPasswordStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  firstContent: {
    flex: 2,
    justifyContent: "center"
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
    width: "70%",
    paddingHorizontal: 20
  },

  inputLabelContent: {
    width: "30%"
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

  secondContent: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  button: {
    borderRadius: 27,
    padding: 15,
    width: "85%",
    borderWidth: 1,
    borderColor: "#222222"
  },

  buttonSvgContainer: {
    width: "55%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "flex-end"
  },

  text: {
    color: "#222222",
    fontFamily: "Metropolis-Medium",
    fontSize: 12,
    lineHeight: 15,
    paddingBottom: 10
    //alignSelf: "center"
  },

  error: {
    borderColor: "#EF4131"
  },
  resetText: {
    fontSize: 12,
    color: "rgba(34, 34, 34, 0.4)"
  }
});

export default ResetPasswordStyle;
