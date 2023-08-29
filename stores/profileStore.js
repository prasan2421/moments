import { observable, action, decorate } from "mobx";
import NavigationService from "../utils/NavigationService";
import { contactUs } from "../utils/actions/sentMessage/contactUs";
import { Animated } from "react-native";
import { updateUser } from "../utils/actions/user/update";

class profileStore {
  user = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picture: "",
    oauth: 0,
    seenOnBoarding: 0
  };
  dateType = "AM";
  topModal = false;
  sortType = "DATE";
  dateFormat = "mdy";

  animVal = new Animated.Value(0);
  interpolateBar = this.animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100]
  });
  animatedReduce = Animated.spring(this.animVal, { toValue: 1 });
  animatedExpand = Animated.spring(this.animVal, { toValue: 0, friction: 100 });

  setDateType = type => {
    this.dateType = type;
  };

  setProfile = userData => {
    let { firstName, lastName, email, password, seenOnBoarding } = userData;

    updateUser(firstName, lastName, email, password, seenOnBoarding)
      .then(response => (this.user = response.data))
      .catch(error => {
        // display failure popup
        console.log(error.response);
      });
  };

  setDateFormat = format => {
    this.dateFormat = format;
  };

  setSortType = type => {
    this.sortType = type;
  };

  toggleIsTopOpen = () => {
    this.topModal = !this.topModal;
    if (this.topModal) {
      this.animatedReduce.start();
    } else {
      this.animatedExpand.start();
    }
  };

  getDateType = () => {
    return this.dateType;
  };

  getDateFormat = () => {
    return this.dateFormat;
  };
  getSortType = () => {
    return this.sortType;
  };

  sendMessage = (data, resetForm) => {
    let { message } = data;

    contactUs(message)
      .then(() => {
        resetForm();
        NavigationService.navigate("Profile");
      })
      .catch(error => {
        // display failure popup
      });
  };
}

decorate(profileStore, {
  setProfile: action,
  user: observable,
  sendMessage: action,
  setDateType: action,
  getDateType: action,
  setSortType: action,
  getSortType: action,
  setDateFormat: action,
  getDateFormat: action,
  toggleIsTopOpen: action,
  topModal: observable,
  interpolateBar: observable
});

export default new profileStore();
