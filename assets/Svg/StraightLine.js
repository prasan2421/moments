import React from "react";
import Svg, { Path } from "react-native-svg";

const StraightLine = props => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M3.6 5.2H2v11.2A1.6 1.6 0 003.6 18h11.2v-1.6H3.6V5.2zM16.4 2H6.8a1.6 1.6 0 00-1.6 1.6v9.6a1.6 1.6 0 001.6 1.6h9.6a1.6 1.6 0 001.6-1.6V3.6A1.6 1.6 0 0016.4 2zm-.8 7.2h-3.2v3.2h-1.6V9.2H7.6V7.6h3.2V4.4h1.6v3.2h3.2v1.6z"
      fill="#fff"
    />
  </Svg>
);

export default StraightLine;
