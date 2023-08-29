import React from "react";
import { Path, Svg } from "react-native-svg";

const Home = props => (
  <Svg width={18} height={18} fill="#262628" {...props}>
    <Path
      d="M15.75 15.75h-3.375v-4.5A2.25 2.25 0 0 0 10.125 9h-2.25a2.25 2.25 0 0 0-2.25 2.25v4.5H2.25v-9L9 2.25l6.75 4.5v9zm-7.875 0h2.25v-4.5h-2.25v4.5zm9.123-10.872l-6.75-4.5A2.236 2.236 0 0 0 9 0c-.435 0-.87.125-1.247.378l-6.75 4.5A2.248 2.248 0 0 0 0 6.75v9A2.25 2.25 0 0 0 2.25 18h13.5A2.25 2.25 0 0 0 18 15.75v-9c0-.753-.376-1.455-1.002-1.872z"
      fill={"#262628"}
    />
  </Svg>
);

export default Home;
