import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  BackHandler,
  Linking,
  Dimensions
} from "react-native";
import DissmissKeyboard from "../Utils/DismissKeyboard";
import styles from "./FooterStyles";
import { inject, observer } from "mobx-react";
import Home from "../../assets/Svg/Home";
import Plus from "../../assets/Svg/Plus";
import Gear from "../../assets/Svg/Gear";
import BigPlus from "../../assets/Svg/BigPlus";
import BackHome from "../../assets/Svg/BackHome";
import BackHomeDark from "../../assets/Svg/BackHomeDark";

const footerItems = [
  {
    key: "home",
    icon: <BackHome fill="#262628" />,
    activeIcon: <BackHomeDark />
  },
  { key: "camera", icon: <BigPlus fill="#FF0000" /> },
  { key: "settings", icon: <Gear /> }
];

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape"
    };
  }

  componentDidMount() {
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", () => {});
  }

  setActiveTab = index => {};

  render() {
    let { activeTab } = this.props.footerStore;

    return (
      <View style={styles.footerContainer}>
        <View
          style={{
            ...styles.footer,
            ...(this.state.orientation === "landscape" &&
              styles.landscapeFooter)
          }}
        >
          {footerItems.map((item, i) => {
            return (
              <TouchableOpacity
                key={item.key}
                style={{
                  ...styles.buttonFlex,
                  ...((activeTab === i || item.key === "camera") &&
                    styles.activeButtonFlex)
                }}
                onPress={() => this.props.footerStore.setTab(i, item.key)}
              >
                {React.cloneElement(
                  this.props.footerStore.activeTab === i && item.activeIcon
                    ? item.activeIcon
                    : item.icon,
                  { active: activeTab, index: i }
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        {/*<View style={{...styles.footerSelector, ...(activeTab === 2 && styles.rightSelector)}}>*/}
        {/*</View>*/}
      </View>
    );
  }
}

export default inject("footerStore")(observer(Footer));
