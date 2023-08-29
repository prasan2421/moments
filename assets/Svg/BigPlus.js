import React from 'react'
import Svg, {Path} from "react-native-svg";

const BigPlus = props => (
    <Svg width={18} height={18} fill="#262628" {...props}>
        <Path
            d="M16.875 7.875h-6.75v-6.75a1.124 1.124 0 1 0-2.25 0v6.75h-6.75a1.124 1.124 0 1 0 0 2.25h6.75v6.75a1.125 1.125 0 1 0 2.25 0v-6.75h6.75a1.125 1.125 0 1 0 0-2.25z"
        />
    </Svg>
)

export default BigPlus
