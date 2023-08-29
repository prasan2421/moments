import React from "react";
import { Path, Svg } from "react-native-svg";

const Dots = props => (
  <Svg width={16} height={3} fill="none" {...props}>
    <Path
      d="M8 0c-.885 0-1.6.67-1.6 1.5S7.115 3 8 3c.885 0 1.6-.67 1.6-1.5S8.885 0 8 0zm6.4 0c-.885 0-1.6.67-1.6 1.5S13.515 3 14.4 3c.885 0 1.6-.67 1.6-1.5S15.285 0 14.4 0zM1.6 0C.715 0 0 .67 0 1.5S.715 3 1.6 3c.885 0 1.6-.67 1.6-1.5S2.485 0 1.6 0z"
      fill={props.fill}
    />
  </Svg>
);

export default Dots;
