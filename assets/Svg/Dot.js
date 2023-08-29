import React from 'react'
import Svg, {Path} from "react-native-svg";


const Dot = props => (
  <Svg width={10} height={10} fill="none" {...props}>
    <Path d="M5 9a4 4 0 100-8 4 4 0 000 8z" fill={props.fill} stroke="#222" />
  </Svg>
)

export default Dot
