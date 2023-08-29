import { Platform, StyleSheet } from "react-native";
// import { getBottomSpace, ifIphoneX } from "react-native-iphone-x-helper";

const FooterStyles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },
  footer: {
    //flex:1,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    height: 55,
    // ...ifIphoneX(
    //   {
    //     height: 55 + getBottomSpace(),
    //     paddingBottom: getBottomSpace()
    //   },
    //   { height: 55 }
    // )
  },
  landscapeFooter: {
    // ...ifIphoneX(
    //   {
    //     height: 55,
    //     paddingTop: getBottomSpace()
    //   },
    //   { height: 55 }
    // )
  },
  footerSelector: {
    height: 3,
    backgroundColor: "#000000",
    width: `${3 * (100 / 15)}%`,
    marginLeft: `${100 / 15}%`
  },
  rightSelector: {
    marginLeft: `${(11 * 100) / 15}%`
  },
  buttonFlex: {
    width: 100,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
    opacity: 1
  },
  activeButtonFlex: {
    opacity: 1
  }
});

export default FooterStyles;
