import React from "react";
import Svg, { Path } from "react-native-svg";

const Plus = props => (
  <Svg width={10} height={10} fill="none" {...props}>
    <Path
      d="M9 4H6V1c0-.55-.45-1-1-1S4 .45 4 1v3H1c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1V6h3c.55 0 1-.45 1-1s-.45-1-1-1z"
      fill="#262628"
    />
  </Svg>
);

export default Plus;
