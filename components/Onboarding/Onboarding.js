import React, { Component } from "react";
import { Animated, Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./OnboardingStyles";
import { inject, observer } from "mobx-react";
import loginStore from "../../stores/loginStore";
import onboarding_1 from "../../assets/Images/onboarding_1.png";
import * as config from "../../app.json";

class Onboarding extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { getParam } = this.props.navigation;

    if (getParam("callFrom") === "Gallery") {
      let { setProfile, user } = this.props.profileStore;

      let { firstName, lastName, email } = user;
      setProfile({ firstName, lastName, email, seenOnBoarding: 1 });
    }
  }

  onPressHandler = () => {
    if (this.props.navigation.getParam("firstLoad")) {
      this.props.navigation.navigate("Gallery");
    } else {
      this.props.navigation.navigate("Settings");
    }
  };

  animVal = new Animated.Value(0);
  interpolateBar = this.animVal.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "-190%"]
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundHeader}>
          <Text style={styles.versionText}>{`v${config.versionName}`}</Text>
          <Text style={styles.versionText}>{config.versionDate}</Text>
        </View>
        <View style={styles.pageIndicator}></View>
        <View style={styles.carouselContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.onboardingImage} source={onboarding_1} />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            Tap to Highlight while you record!
          </Text>
          <Text style={styles.paragraphText}>
            Capture pre-configured video highlights.
          </Text>
          <Text style={{ ...styles.paragraphText, ...styles.paragraphBold }}>
            Instantly save, share, extract, analyze, compare or delete.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.onPressHandler}>
            <Text style={styles.text}>DONE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default inject("profileStore", "loginStore")(observer(Onboarding));
