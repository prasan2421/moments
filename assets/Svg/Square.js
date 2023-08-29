import React from 'react'
import Svg, {Path} from "react-native-svg";

const Square = props => (
    <Svg width={20} height={20} fill="none" {...props}>
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5 2.5v15h15v-15h-15zm17.5 15v-15A2.5 2.5 0 0 0 17.5 0h-15A2.5 2.5 0 0 0 0 2.5v15A2.5 2.5 0 0 0 2.5 20h15a2.5 2.5 0 0 0 2.5-2.5z"
            fill={props.fill}
        />
    </Svg>
)

export default Square
