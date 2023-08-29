import React, { Component } from "react";
import { View, Text,StatusBar } from "react-native";
import styles from "./SplashScreenStyles";
import SplashLogo from "../../assets/Svg/SplashLogo";
// import DeviceStorage from "../../utils/DeviceStorage";
// import { axiosInstance } from "../../utils/restApi";
// import { inject, observer } from "mobx-react";

class SplashScreen extends Component {
  // constructor(props) {
  //   super(props);
  //   this.checkAuth();
  // }

  checkAuth = async () => {

    // setTimeout(() => {
      
    //   this.props.navigation.navigate('Auth'); // Navigate to the main page
    // }, 2000);

    // const userToken = await DeviceStorage.get("token");
    // if (userToken) {
    //   axiosInstance.defaults.headers["Authorization"] = `Bearer ${userToken}`;
    //   try {
    //     let userLoggedIn = await this.props.loginStore.getCurrentUser();
    //     await this.props.navigation.navigate(userLoggedIn ? "App" : "Auth");
    //   } catch (e) {
    //     await this.props.navigation.navigate("Auth");
    //   }
    // } else {
    //   await this.props.navigation.navigate("Auth");
    // }
  };

  render() {
    return (
      <>
      <StatusBar
      animated={true}
      backgroundColor="white"
     
    />
      <View style={styles.container}>
        <SplashLogo />

      </View>
      </>
    );
  }
}

// export default inject("loginStore")(observer(SplashScreen));
export default SplashScreen;
