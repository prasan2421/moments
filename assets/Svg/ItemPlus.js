import React from "react";
import { Path, Svg } from "react-native-svg";

export const ItemPlus = props => (
  <Svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.98 0H5.32V5.32H0V7.98H5.32V13.3H7.98V7.98H13.3V5.32H7.98V0Z"
    />
  </Svg>
);
