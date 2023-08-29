import React from 'react'
import Svg, {Path} from "react-native-svg";

const Clock = props => (
    <Svg width={16} height={16} fill="none" {...props}>
        <Path
            d="M11 7H9V5a1 1 0 0 0-2 0v3a1 1 0 0 0 1 1h3a1 1 0 1 0 0-2zm-3 7a6 6 0 1 1 .002-12.002A6 6 0 0 1 8 14zM8 0C3.589 0 0 3.59 0 8c0 4.411 3.589 8 8 8s8-3.589 8-8c0-4.41-3.589-8-8-8z"
            fill="#262628"
        />
    </Svg>
)

export default Clock
