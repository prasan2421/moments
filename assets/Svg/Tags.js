import React from 'react'
import Svg, {Path} from "react-native-svg";

const Tags = props => (
    <Svg width={22} height={22} fill="none" {...props}>
        <Path
            d="M4.125 4.125h15.813a2.062 2.062 0 1 1 0 4.125H4.124V4.125z"
            fill={props.fill}
        />
        <Path
            d="M8.25 17.875V2.062a2.062 2.062 0 1 0-4.125 0v15.813H8.25z"
            fill={props.fill}
        />
        <Path
            d="M16.5 13.75H2.062a2.062 2.062 0 1 0 0 4.125H16.5V13.75z"
            fill={props.fill}
        />
        <Path
            d="M18.563 7.563V19.25a2.062 2.062 0 1 1-4.125 0V7.562h4.124z"
            fill={props.fill}
        />
    </Svg>
)

export default Tags
