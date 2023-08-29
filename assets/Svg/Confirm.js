import React from 'react'
import Svg, {Path} from "react-native-svg";

const Confirm = props => (
    <Svg width={18} height={16} fill="#262628"
         stroke="#262628" {...props}>
        <Path
            d="M16.403 1.198a.985.985 0 0 0-1.382.198L6.817 12.384l-4.132-4.15a.983.983 0 0 0-1.396 0 .995.995 0 0 0 0 1.402l4.937 4.958a.983.983 0 0 0 1.488-.106l8.886-11.9a.994.994 0 0 0-.197-1.39z"
        />
    </Svg>
)

export default Confirm
