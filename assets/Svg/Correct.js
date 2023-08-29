import React from "react";
import { Path, Svg } from "react-native-svg";

const Correct = props => (
  <Svg width={16} height={16} viewBox="0 0 16 16" {...props}>
    <Path d="M5.5 15.5a1.25 1.25 0 01-.884-.366l-3.75-3.75a1.25 1.25 0 011.768-1.768l2.696 2.697 7.895-11.28a1.25 1.25 0 012.049 1.433l-8.75 12.5a1.251 1.251 0 01-.915.534 1.096 1.096 0 01-.109 0z" />
  </Svg>
);

export default Correct;
