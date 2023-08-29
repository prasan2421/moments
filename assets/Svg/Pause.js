import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const Pause = props => (
  <Svg width={42} height={42} viewBox="0 0 42 42" fill="none" {...props}>
    <Path
      d="M31.5 8.973c0-1.604-1.26-2.673-3.15-2.673S25.2 7.636 25.2 8.973v24.054c0 1.604 1.26 2.673 3.15 2.673.945 0 1.575-.267 2.205-.802.63-.534.945-1.069.945-1.87V8.972zM13.592 6.3c-1.855 0-3.092 1.336-3.092 2.673v24.054c0 1.604 1.237 2.673 3.092 2.673.928 0 1.546-.267 2.164-.802.928-.534 1.237-1.069.928-1.87V8.972c0-1.337-1.237-2.673-3.092-2.673z"
      fill="#fff"
    />
  </Svg>
);

export default Pause;
