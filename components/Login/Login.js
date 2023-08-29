import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  BackHandler
} from "react-native";
import DissmissKeyboard from "../Utils/DismissKeyboard";
import { inject, observer } from "mobx-react";
import { Arrow } from "../../assets/Svg/Arrow";
import { Google } from "../../assets/Svg/Google";
import { Facebook } from "../../assets/Svg/Facebook";
import * as yup from "yup";
import { Formik } from "formik";
import DialogBox from "../Global/DialogBox";
import styles from "./LoginStyles";
import { googleSignIn } from "../../utils/oauth/google";
import { facebookSignIn } from "../../utils/oauth/facebook";
// import NetInfo from "@react-native-community/netinfo";
import showToast from "../Toast/Toast";
// import Orientation from "react-native-orientation";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      selection: null
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    // Orientation.lockToPortrait();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    // Orientation.unlockAllOrientations();
  }

  handleBackButton = () => {
    return true;
  };

  // checkConnection = async () => {
  //   let connectionState = await NetInfo.fetch();
  //   if (connectionState.isConnected) {
  //     return true;
  //   } else {
  //     showToast("You are offline, please connect to the internet.", "LONG");

  //     return false;
  //   }
  // };

  /*---- Google Auth ----*/
  googleAuth = async () => {
    // this.checkConnection().then(async connected => {
    //   if (connected) {
        let userData = await googleSignIn();
        userData && this.props.loginStore.oauth(userData);
    //   }
    // });
  };

  /*---- Facebook Auth ----*/
  facebookAuth = async () => {
    // this.checkConnection().then(async connected => {
    //   if (connected) {
        let userData = await facebookSignIn();
        userData && this.props.loginStore.oauth(userData);
    //   }
    // });
  };

  handleSubmit = values => {
    // this.checkConnection().then(connected => {
    //   if (connected) {
        this.props.loginStore.logIn(values.email, values.password);
    //   }
    // });
  };

  render() {
    const {
      resetError,
      loginError,
      errorPopupVisible,
      closePopup,
      errorText
    } = this.props.loginStore;

    return (
      <DissmissKeyboard>
        <View style={styles.container}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={values => {
              this.handleSubmit(values);
            }}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email()
                .required(),
              password: yup
                .string()
                .min(6)
                .required()
            })}
          >
            {({
              handleChange,
              errors,
              setFieldTouched,
              touched,
              handleSubmit,
              values
            }) => (
              <View style={styles.content}>
                {/*---- Input content ----*/}
                <View style={styles.inputContent}>
                  {/*---- Email text input ----*/}
                  <View
                    style={{
                      ...styles.input,
                      ...(touched.email && errors.email && styles.error),
                      ...(loginError && styles.error)
                    }}
                    onTouchEnd={() => this.emailRef.focus()}
                  >
                    <TextInput
                      style={styles.textInputComponent}
                      scrollEnabled={false}
                      selection={this.state.selection}
                      allowFontScaling={false}
                      onChangeText={handleChange("email")}
                      ref={ref => (this.emailRef = ref)}
                      onBlur={() => {
                        setFieldTouched("email");
                        this.setState({
                          selection: { start: 0, end: 0 }
                        });
                      }}
                      onFocus={() => {
                        this.setState(
                          {
                            selection: {
                              start: values.email.length,
                              end: values.email.length
                            }
                          },
                          () => {
                            setTimeout(() =>
                              this.setState({ selection: null })
                            );
                          }
                        );
                        resetError;
                      }}
                      autoCapitalize="none"
                    />
                    <View style={styles.inputLabelContent}>
                      <View style={styles.inputLabel}>
                        <Text style={styles.inputText}>Email</Text>
                      </View>
                    </View>
                  </View>
                  {/*---- Password text input and forgot password----*/}
                  <View>
                    <View
                      style={{
                        ...styles.input,
                        ...(touched.password &&
                          errors.password &&
                          styles.error),
                        ...(loginError && styles.error)
                      }}
                      onTouchEnd={() => this.passwordRef.focus()}
                    >
                      <TextInput
                        style={styles.textInputComponent}
                        secureTextEntry={true}
                        onChangeText={handleChange("password")}
                        onBlur={() => setFieldTouched("password")}
                        onFocus={resetError}
                        ref={ref => (this.passwordRef = ref)}
                        autoCapitalize="none"
                      />
                      <View style={styles.inputLabelContent}>
                        <View style={styles.inputLabel}>
                          <Text style={styles.inputText}>Password</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ ...styles.rowDirection, marginTop: 10 }}>
                      <Text style={styles.resetText}>Forgot Password? </Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("ResetPassword")
                        }
                      >
                        <Text style={styles.text}>Tap here to reset it.</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {/*---- Login button content ----*/}
                <View style={styles.loginButtonContent}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.buttonLoginContainer}
                  >
                    <View style={styles.buttonLogin}>
                      <Text style={styles.loginButtonText}>LOGIN</Text>
                      <Arrow fill={"#000000"} />
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      ...styles.rowDirection,
                      marginTop: 10,
                      alignItems: "center"
                    }}
                  >
                    <Text style={styles.resetText}>
                      By signing in you agree to our
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("TermsAndConditions")
                      }
                    >
                      <Text style={styles.text}> Terms & Conditions</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </Formik>
          {/*---- Service content ----*/}
          <View style={styles.serviceContent}>
            {/*---- Google content ----*/}
            <TouchableOpacity
              onPress={() => this.googleAuth()}
              style={{
                ...styles.serviceButtonContent,
                backgroundColor: "#EF4131"
              }}
            >
              <View style={styles.rowDirection}>
                <View style={styles.iconServiceContent}>
                  <Google />
                </View>

                <View style={styles.textServiceContent}>
                  <Text style={styles.serviceText}>GOOGLE LOGIN</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/*---- Facebook content ----*/}
            <TouchableOpacity
              onPress={() => this.facebookAuth()}
              style={{
                ...styles.serviceButtonContent,
                backgroundColor: "#3F51A2"
              }}
            >
              <View style={styles.rowDirection}>
                <View style={styles.iconServiceContent}>
                  <Facebook />
                </View>

                <View style={styles.textServiceContent}>
                  <Text style={styles.serviceText}>FACEBOOK LOGIN</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/*----Dialog Box ----*/}
          <DialogBox
            isDialogVisible={errorPopupVisible}
            title={errorText || "Wrong credentials"}
            cancelText={"OK"}
            closeDialog={closePopup}
          />
        </View>
      </DissmissKeyboard>
    );
  }
}

export default inject("loginStore")(observer(Login));
