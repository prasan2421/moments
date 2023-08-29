import React from 'react'
import Svg, {Path} from "react-native-svg";

const Calendar = props => (
    <Svg width={16} height={16} fill="none" {...props}>
        <Path
            d="M14 5H2V3h2a1 1 0 0 0 2 0h4a1 1 0 1 0 2 0h2v2zM2 14h12V7H2v7zM14 1h-2a1 1 0 1 0-2 0H6a1 1 0 0 0-2 0H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z"
            fill="#262628"
        />
    </Svg>
)

export default Calendar
