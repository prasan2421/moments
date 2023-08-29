import { StyleSheet } from "react-native";

const TermsAndConditionsStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //alignItems: 'center',
    backgroundColor: "#ffffff",
    paddingBottom: 20
  },
  textScrollView: {
    paddingVertical: 20,
    paddingHorizontal: 40
  },
  title: {
    color: "#222222",
    fontFamily: "Metropolis-Bold",
    fontSize: 20,
    paddingBottom: 20
  },
  heading: {
    color: "#222222",
    fontFamily: "Metropolis-ExtraBold",
    fontSize: 14,
    paddingBottom: 20
  },
  textBody: {
    textAlign: "justify",
    color: "#222222",
    fontFamily: "Metropolis-Regular",
    fontSize: 12,
    lineHeight: 20,
    paddingBottom: 20
  },
  textBold: {
    fontFamily: "Metropolis-Bold"
  },
  textItalic: {
    fontStyle: "italic"
  },
  hyperLink: {
    color: "#579FFB"
  },
  textUnderlined: {
    textDecorationLine: "underline"
  }
});

export default TermsAndConditionsStyle;
