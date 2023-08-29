import React from "react";
import { Path, Svg } from "react-native-svg";

const BackHome = props => (
  <Svg width={22} height={22} viewBox="0 0 32 32" fill="#ffffff" {...props}>
    <Path d="M31.4 14.6l-14-14c-.8-.8-2-.8-2.8 0l-14 14c-.8.8-.8 2 0 2.8.8.8 2 .8 2.8 0l.6-.6V26c0 3.4 2.6 6 6 6h12c3.4 0 6-2.6 6-6v-9.2l.6.6c.4.4.8.6 1.4.6.6 0 1-.2 1.4-.6.8-.8.8-2 0-2.8zM16 23c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1zm8 3c0 1.2-.8 2-2 2h-2V18c0-1.2-.8-2-2-2h-4c-1.2 0-2 .8-2 2v10h-2c-1.2 0-2-.8-2-2V12.8l8-8 8 8V26z" />
  </Svg>
);

export default BackHome;
