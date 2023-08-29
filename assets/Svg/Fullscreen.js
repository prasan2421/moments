import React from "react";
import { Path, Svg } from "react-native-svg";

const Fullscreen = props => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M9.707 10.293a1 1 0 00-1.414 0L5 13.586V11a1 1 0 10-2 0v5a1 1 0 001 1h5a1 1 0 000-2H6.414l3.293-3.293a1 1 0 000-1.414zM16 3h-5a1 1 0 100 2h2.586l-3.293 3.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 002 0V4a1 1 0 00-1-1z"
      fill="#fff"
    />
  </Svg>
);

export default Fullscreen;
