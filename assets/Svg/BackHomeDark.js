import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const BackHomeDark = props => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M19.625 9.125l-8.75-8.75c-.5-.5-1.25-.5-1.75 0l-8.75 8.75c-.5.5-.5 1.25 0 1.75s1.25.5 1.75 0L2.5 10.5v5.75C2.5 18.375 4.125 20 6.25 20h7.5c2.125 0 3.75-1.625 3.75-3.75V10.5l.375.375c.25.25.5.375.875.375s.625-.125.875-.375c.5-.5.5-1.25 0-1.75z"
          fill="#000"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default BackHomeDark;
