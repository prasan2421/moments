import { Platform } from "react-native";
import { LoginManager, AccessToken } from "react-native-fbsdk";

const FB_GRAPH_URL = "https://graph.facebook.com/v2.5/me?fields=";

export const facebookSignIn = async () => {
  try {
    if (Platform.OS === "android") {
      // LoginManager.setLoginBehavior("web_only");
    }
    // let result = await LoginManager.logInWithPermissions([
    //   "public_profile",
    //   "email",
    //   "user_friends"
    // ]);

    if (!result.isCancelled) {
      // let tokenData = await AccessToken.getCurrentAccessToken();
      // let accessToken = tokenData.accessToken;
      let fetchData = await fetch(
        FB_GRAPH_URL +
          "email,name,first_name,last_name,picture&access_token=" +
          accessToken
      );

      let responseData = await fetchData.json();
      
      let loginData = {
        firstName: responseData.first_name,
        lastName: responseData.last_name,
        email: responseData.email,
        token: accessToken,
        picture: responseData.picture.data.url,
        external: true
      };

      return loginData;
    }
  } catch (error) {
    return error;
  }
};
