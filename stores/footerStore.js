import { action, decorate, observable } from "mobx";
import NavigationService from "../utils/NavigationService";

class footerStore {
  activeTab: 0;

  setTab = (tab, tabKey) => {
    this.activeTab = tab;
    if (tabKey === "home") {
      NavigationService.navigate("Gallery");
    }
    if (tabKey === "camera") {
      NavigationService.navigate("Camera");
    } else if (tabKey === "settings") {
      NavigationService.navigate("Settings");
    }
  };
}

decorate(footerStore, {
  activeTab: observable,
  setTab: action
});

export default new footerStore();
