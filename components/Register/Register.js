import React, { Component, Fragment } from "react";
import {
  KeyboardAvoidingView,
  Text,
  Keyboard,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Platform
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import DissmissKeyboard from "../Utils/DismissKeyboard";
import styles from "./RegisterStyles";
import DialogBox from "../Global/DialogBox";
import { inject, observer } from "mobx-react";
// import NetInfo from "@react-native-community/netinfo";
import showToast from "../Toast/Toast";

class Register extends Component {
  static navigationOptions = {
    title: "Sign up"
  };

  state = {
    height: null,
    keyboardHeight: null,
    marginHeight: null,
    selection: null,
    keyboardShown: false
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardShowHandler
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardShowHandler = e => {
    if (Platform.OS === "ios" && !this.state.keyboardShown) {
      this._keyboardDidShow(e);
      this.setState({ keyboardShown: true });
    } else if (Platform.OS === "android") {
      this._keyboardDidShow(e);
    }
  };

  _keyboardDidShow = e => {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
      marginHeight: (this.state.height * 11.25) / 100
    });

    this.setState({
      height:
        this.state.height + this.state.marginHeight - this.state.keyboardHeight
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      height:
        this.state.height - this.state.marginHeight + this.state.keyboardHeight,
      keyboardShown: false
    });
  };

  handleSubmit = (values, resetForm) => {
    // NetInfo.fetch().then(state => {
    //   if (!state.isConnected) {
        showToast("You are offline, please connect to the internet.", "LONG");
    //   } else {
    //     this.props.loginStore.signUp(values, resetForm);
    //   }
    // });
  };

  render() {
    let {
      signUpErrorText,
      signUpErrorPopupVisible,
      closeSignUpPopup,
      confirmationDialogVisible,
      closeConfirmationPopup
    } = this.props.loginStore;

    return (
      <DissmissKeyboard>
        <View style={styles.container}>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              passwordConfirmation: ""
            }}
            onSubmit={async (values, { resetForm }) => {
              this.handleSubmit(values, resetForm);
            }}
            validationSchema={yup.object().shape({
              firstName: yup.string().required(),
              lastName: yup.string().required(),
              email: yup
                .string()
                .email()
                .required(),
              password: yup
                .string()
                .min(6)
                .required(),
              passwordConfirmation: yup
                .string()
                .oneOf([yup.ref("password"), null], "Passwords must match")
                .required()
            })}
          >
            {({
              handleChange,
              errors,
              setFieldTouched,
              touched,
              handleSubmit,
              values,
              setFieldValue
            }) => (
              <Fragment>
                <KeyboardAvoidingView style={{ flex: 1, width: "100%" }}>
                  <View style={{ flex: 1 }}>
                    <ScrollView
                      style={{
                        ...styles.content
                      }}
                      contentContainerStyle={{
                        height: this.state.height,
                        justifyContent: "space-around",
                        alignItems: "center"
                      }}
                      onLayout={event => {
                        let { height } = event.nativeEvent.layout;
                        this.setState({ height: height });
                      }}
                    >
                      <View
                        style={{
                          ...styles.input,
                          ...(touched.firstName &&
                            errors.firstName &&
                            styles.error)
                        }}
                        onTouchEnd ={() => this.firstNameRef.focus()}
                      >
                        <TextInput
                          ref={ref => this.firstNameRef = ref}
                          style={styles.textInputComponent}
                          allowFontScaling={false}
                          onChangeText={value =>
                            setFieldValue("firstName", value)
                          }
                          onBlur={() => setFieldTouched("firstName")}
                          value={values.firstName}
                        />
                        <View style={styles.inputLabelContent}>
                          <View style={styles.inputLabel}>
                            <Text style={styles.inputText}>First name</Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          ...styles.input,
                          ...(touched.lastName &&
                            errors.lastName &&
                            styles.error)
                        }}
                        onTouchEnd ={() => this.lastNameRef.focus()}
                      >
                        <TextInput
                          ref={ref => this.lastNameRef = ref}
                          style={styles.textInputComponent}
                          allowFontScaling={false}
                          onChangeText={value =>
                            setFieldValue("lastName", value)
                          }
                          onBlur={() => setFieldTouched("lastName")}
                          value={values.lastName}
                        />
                        <View style={styles.inputLabelContent}>
                          <View style={styles.inputLabel}>
                            <Text style={styles.inputText}>Last name</Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          ...styles.input,
                          ...(touched.email && errors.email && styles.error)
                        }}
                        onTouchEnd ={() => this.registerEmailRef.focus()}
                      >
                        <TextInput
                          ref={ref => this.registerEmailRef = ref}
                          style={styles.textInputComponent}
                          allowFontScaling={false}
                          onChangeText={value => setFieldValue("email", value)}
                          selection={this.state.selection}
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
                          }}
                          value={values.email}
                          autoCapitalize="none"
                        />
                        <View style={styles.inputLabelContent}>
                          <View style={styles.inputLabel}>
                            <Text style={styles.inputText}>Email</Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          ...styles.input,
                          ...(touched.password &&
                            errors.password &&
                            styles.error)
                        }}
                        onTouchEnd ={() => this.registerPasswordRef.focus()}
                      >
                        <TextInput
                          ref={ref => this.registerPasswordRef = ref}
                          style={styles.textInputComponent}
                          allowFontScaling={false}
                          secureTextEntry
                          onChangeText={value =>
                            setFieldValue("password", value)
                          }
                          onBlur={() => setFieldTouched("password")}
                          value={values.password}
                          autoCapitalize="none"
                        />
                        <View style={styles.inputLabelContent}>
                          <View style={styles.inputLabel}>
                            <Text style={styles.inputText}>Password</Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          ...styles.input,
                          ...(touched.passwordConfirmation &&
                            errors.passwordConfirmation &&
                            styles.error)
                        }}
                        onTouchEnd ={() => this.confrimPasswordRef.focus()}
                      >
                        <TextInput
                          ref={ref => this.confrimPasswordRef = ref}
                          style={styles.textInputComponent}
                          allowFontScaling={false}
                          secureTextEntry
                          onChangeText={value =>
                            setFieldValue("passwordConfirmation", value)
                          }
                          onBlur={() => setFieldTouched("passwordConfirmation")}
                          value={values.passwordConfirmation}
                          autoCapitalize="none"
                        />
                        <View style={styles.inputLabelContent}>
                          <View style={styles.inputLabel}>
                            <Text style={styles.inputText}>
                              Confirm password
                            </Text>
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </KeyboardAvoidingView>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}
                  >
                    <Text style={styles.text}>NEXT</Text>
                  </TouchableOpacity>
                </View>
              </Fragment>
            )}
          </Formik>

          {/*----Dialog Box ----*/}
          <DialogBox
            isDialogVisible={signUpErrorPopupVisible}
            title={
              signUpErrorText
                ? signUpErrorText
                : "Sign Up information is incorrect"
            }
            cancelText={"OK"}
            closeDialog={closeSignUpPopup}
          />
          <DialogBox
            isDialogVisible={confirmationDialogVisible}
            title={
              "Sign Up Succeeded. Please check your email for confirmation."
            }
            cancelText={"OK"}
            closeDialog={closeConfirmationPopup}
          />
        </View>
      </DissmissKeyboard>
    );
  }
}

export default inject("loginStore")(observer(Register));
