import { StyleSheet } from "react-native";

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },

  content: {
    flex: 8,
    width: "85%"
  },

  inputContent: {
    flex: 3,
    justifyContent: "space-evenly"
  },

  input: {
    fontFamily: "CircularStd-Book",
    width: "100%",
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
    width: "70%",
    alignItems: "flex-end"
  },

  inputText: {
    fontFamily: "CircularStd-Book",
    color: "rgba(38, 38, 40, 0.4)",
    fontSize: 11,
    letterSpacing: 0.3
  },

  rowDirection: {
    flexDirection: "row"
  },

  resetText: {
    fontSize: 12,
    color: "rgba(34, 34, 34, 0.4)"
  },

  text: {
    fontFamily: "CircularStd-Book",
    fontSize: 12,
    color: "#222222"
  },

  loginButtonContent: {
    flex: 4
  },

  buttonLoginContainer: {
    borderRadius: 35,
    marginTop: 35,
    padding: 20,
    borderWidth: 1,
    borderColor: "#222222"
  },

  loginButtonText: {
    fontFamily: "CircularStd-Medium",
    fontSize: 15,
    color: "#222222"
  },

  buttonLogin: {
    width: "55%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center"
  },

  serviceContent: {
    flex: 2,
    width: "100%"
  },

  serviceButtonContent: {
    flex: 1,
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#EF4131"
  },

  textServiceContent: {
    alignItems: "center",
    width: "80%"
  },

  serviceText: {
    fontSize: 13,
    color: "#FFFFFF",
    letterSpacing: 0.3
  },

  iconServiceContent: {
    alignItems: "center",
    width: "10%",
    justifyContent: "center"
  },

  error: {
    borderColor: "#EF4131"
  }
});

export default LoginStyles;
