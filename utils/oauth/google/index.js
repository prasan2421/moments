import { GoogleSignin } from "react-native-google-signin";

GoogleSignin.configure({
  scopes: ["email", "profile"],
  androidClientId:
    "762452049607-89ectdhn27a0kfd5icpr8sdv22q77ejv.apps.googleusercontent.com"
  // offlineAccess: true,
  // hostedDomain: "",
  // loginHint: "", // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  // accountName: "", // [Android] specifies an account name on the device that should be used
  // iosClientId: "<FROM DEVELOPER CONSOLE>" // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

export const googleSignIn = async () => {
  try {
    const userInfo = await GoogleSignin.signIn();

    const loginData = {
      firstName: userInfo.user.givenName,
      lastName: userInfo.user.familyName,
      email: userInfo.user.email,
      picture: userInfo.user.photo,
    };

    return loginData;
  } catch (error) {
    return error;
  }
};
