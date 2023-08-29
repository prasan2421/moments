import React, { Component, Fragment } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { inject, observer } from "mobx-react";
import DissmissKeyboard from "../Utils/DismissKeyboard";
import styles from "./ResetPasswordStyle";
import { Arrow } from "../../assets/Svg/Arrow";
import DialogBox from "../Global/DialogBox";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isDialogVisible: false
    };
  }

  render() {
    let {
      errorPasswordResetPopupVisible,
      errorPasswordResetMessage,
      closePasswordResetPopUp,
      resetPassword
    } = this.props.loginStore;

    return (
      <DissmissKeyboard>
        <View style={styles.container}>
          <Formik
            initialValues={{
              email: ""
            }}
            onSubmit={async (values, { resetForm }) => {
              resetPassword(values, resetForm);
            }}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email()
                .required()
            })}
          >
            {({
              setFieldTouched,
              touched,
              handleSubmit,
              setFieldValue,
              errors
            }) => (
              <Fragment>
                <View style={styles.firstContent}>
                  <Text style={styles.text}>
                    Enter your email address to reset your password.{" "}
                  </Text>
                  <View
                    style={{
                      ...styles.input,
                      ...(touched.email && errors.email && styles.error)
                    }}
                    onTouchEnd={() => this.resetPasswordRef.focus()}
                  >
                    <TextInput
                      style={styles.textInputComponent}
                      ref={ref => (this.resetPasswordRef = ref)}
                      allowFontScaling={false}
                      placeholder=""
                      onChangeText={value => setFieldValue("email", value)}
                      onBlur={() => setFieldTouched("email")}
                    />
                    <View style={styles.inputLabelContent}>
                      <View style={styles.inputLabel}>
                        <Text style={styles.inputText}>Email</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.secondContent}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}
                  >
                    <View style={styles.buttonSvgContainer}>
                      <Text style={styles.text}>RESET</Text>
                      <Arrow fill={"#000000"} />
                    </View>
                  </TouchableOpacity>
                </View>
              </Fragment>
            )}
          </Formik>

          <DialogBox
            isDialogVisible={errorPasswordResetPopupVisible}
            title={errorPasswordResetMessage}
            cancelText={"OK"}
            closeDialog={closePasswordResetPopUp}
          />
        </View>
      </DissmissKeyboard>
    );
  }
}

export default inject("loginStore")(observer(ResetPassword));
