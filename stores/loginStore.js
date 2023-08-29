import { observable, action, decorate } from "mobx";
import { handleLogin } from "../utils/actions/user/login";
import DeviceStorage from "../utils/DeviceStorage";
import { axiosInstance } from "../utils/restApi";
import NavigationService from "../utils/NavigationService";
import { GoogleSignin } from "react-native-google-signin";
import { handleRegister } from "../utils/actions/user/register";
import { createUserOAuth } from "../utils/actions/user/oauthCreate";
import { ToastAndroid } from "react-native";
import profileStore from "./profileStore";
import { LoginManager } from "react-native-fbsdk";
import { currentUser } from "../utils/actions/user/currentUser";
import { authenticateUserOAuth } from "../utils/actions/user/oauthLogin";
import { resetPassword } from "../utils/actions/user/resetPassword";

class loginStore {
  userData = {
    countryCode: "",
    email: "",
    firstName: "",
    lastName: "",
    passwordResetToken: "",
    token: "",
    picture: "",
    oauth: 0
  };
  loginError = false;
  errorPopupVisible = false;
  signUpErrorPopupVisible = false;
  errorText = "";
  signUpErrorText = "";
  errorPasswordResetPopupVisible = false;
  errorPasswordResetMessage = "";
  confirmationDialogVisible = false;

  logIn = (email, password) => {
    handleLogin(email, password)
      .then(response => {
        if (response.status === 200 && response.data) {
          let data = response.data;
          profileStore.user = { ...profileStore.user, ...data };
          this.userData = data;
          DeviceStorage.set("token", data.token);
          axiosInstance.defaults.headers[
            "Authorization"
          ] = `Bearer ${data.token}`;
          NavigationService.navigate("App");
        }
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.errorText = error.response.data.message;
        }
        this.loginError = true;
        this.errorPopupVisible = true;
      });
  };

  resetError = () => {
    this.loginError && (this.loginError = false);
  };

  closePopup = () => {
    this.errorPopupVisible && (this.errorPopupVisible = false);
  };

  closeSignUpPopup = () => {
    this.signUpErrorPopupVisible && (this.signUpErrorPopupVisible = false);
  };

  closeConfirmationPopup = () => {
    this.confirmationDialogVisible && (this.confirmationDialogVisible = false);
  };

  closePasswordResetPopUp = () => {
    this.errorPasswordResetPopupVisible &&
      (this.errorPasswordResetPopupVisible = false);
  };

  // logOff = async () => {
  //   await DeviceStorage.clear();
  //   try {
  //     await GoogleSignin.signOut();
  //     await LoginManager.logOut();
  //   } catch (ex) {}
  //   NavigationService.navigate("Auth");
  // };

  signUpError = (error = "") => {
    let errors;
    if (Array.isArray(error)) {
      errors = error.map(err => "\u2022 " + err).join("\n");
    }
    this.signUpErrorPopupVisible = true;
    this.signUpErrorText = errors ? errors : error;
  };

  oauth = loginData => {
    let { firstName, lastName, email, picture } = loginData;

    createUserOAuth(firstName, lastName, email)
      .then(response => {
        if (response.status === 200 && response.data) {
          let data = response.data;
          authenticateUserOAuth(data.email, data.password).then(response => {
            if (response.status === 200 && response.data) {
              let data = response.data;
              profileStore.user = { ...profileStore.user, ...data, picture };

              this.userData = data;
              DeviceStorage.set("token", data.token);

              axiosInstance.defaults.headers[
                "Authorization"
              ] = `Bearer ${data.token}`;
              NavigationService.navigate("App");
            }
          });
        }
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data === Object(error.response.data) &&
          Object.keys(error.response.data).length > 0
        ) {
          let errors = [].concat(...Object.values(error.response.data));
          this.signUpError(errors);
        } else {
          this.signUpError();
        }
      });
  };

  signUp = (loginData, resetForm) => {
    let { firstName, lastName, email, password } = loginData;

    handleRegister(firstName, lastName, email, password)
      .then(response => {
        resetForm();
        NavigationService.navigate("Login");
        this.confirmationDialogVisible = true;
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data === Object(error.response.data) &&
          Object.keys(error.response.data).length > 0
        ) {
          let errors = [].concat(...Object.values(error.response.data));
          this.signUpError(errors);
        } else {
          this.signUpError();
        }
      });
  };

  /*--- Current User ---*/

  getCurrentUser = async () => {
    let response;

    try {
      response = await currentUser();
      if (response.data) {
        profileStore.user = response.data;
        return Promise.resolve(true);
      } else {
        return Promise.reject();
      }
    } catch (e) {
      return Promise.reject();
    }
  };

  /*--- Reset Password ---*/

  resetPassword = (resetPasswordData, resetForm) => {
    let { email } = resetPasswordData;

    resetPassword(email)
      .then(() => {
        resetForm();

        this.errorPasswordResetMessage =
          "Password reset link has been sent to your email address.";
        this.errorPasswordResetPopupVisible = true;
        NavigationService.navigate("Login");
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.errorPasswordResetMessage = error.response.data.message;
        }
        //this.loginError = true;
        this.errorPasswordResetPopupVisible = true;
      });
  };
}

decorate(loginStore, {
  logIn: action,
  // logOff: action,
  resetError: action,
  closePopup: action,
  userData: observable,
  loginError: observable,
  errorPopupVisible: observable,
  signUpErrorPopupVisible: observable,
  closeSignUpPopup: action,
  confirmationDialogVisible: observable,
  closeConfirmationPopup: action,
  signUpErrorText: observable,
  signUpError: action,
  getCurrentUser: action, // getCurrentUser action
  resetPassword: action, // resetPassword action
  errorPasswordResetPopupVisible: observable, // error resetPassword value
  errorPasswordResetMessage: observable, // error resetPassword message
  closePasswordResetPopUp: action // error resetPassword close popup
});

export default new loginStore();
