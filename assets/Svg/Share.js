import React from "react";
import { Path, Svg } from "react-native-svg";

const Share = props => (
  <Svg width={32} height={32} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M14.707 6.294l-4-4a1 1 0 00-.327-.217.984.984 0 00-.246-.05A.935.935 0 0010 2a.938.938 0 00-.134.027.984.984 0 00-.246.05 1 1 0 00-.33.223l-4 4a1 1 0 001.417 1.408L9 5.415V13a1 1 0 102 0V5.415l2.293 2.293a1 1 0 001.414-1.414z"
      fill="#fff"
    />
    <Path
      d="M16 11a1 1 0 00-1 1v3a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 10-2 0v3a3 3 0 003 3h8a3 3 0 003-3v-3a1 1 0 00-1-1z"
      fill="#fff"
    />
  </Svg>
);

export default Share;
