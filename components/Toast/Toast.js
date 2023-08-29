import Toast from "react-native-root-toast";

// Add a Toast on screen.
const showToast = (
  message,
  duration = Toast.durations.LONG,
  position = Toast.positions.BOTTOM
) => {
  Toast.show(message, {
    duration: Toast.durations[duration],
    position: position,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
};

export default showToast;
