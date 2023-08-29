import { AsyncStorage } from "react-native";

const DeviceStorage = {
  async set(key, val) {
    try {
      await AsyncStorage.setItem(key, val);
    } catch (ex) {
      console.warn(ex.message);
    }
  },
  async get(key) {
    return AsyncStorage.getItem(key);
  },
  async clear() {
    AsyncStorage.clear();
  }
};

export default DeviceStorage;
