import React from 'react'
import Svg, {Path} from "react-native-svg";

const FastBackward = props => (
    <Svg width={16} height={13} fill="none" {...props}>
        <Path
            d="M5.333 10.4H2.667V2.6h2.666v7.8zm8 0V2.6L8 6.5l5.333 3.9zM2.667 0h2.666C6.805 0 8 1.165 8 2.6v.65L11.733.52a2.708 2.708 0 0 1 1.6-.52c.407 0 .815.09 1.192.274A2.594 2.594 0 0 1 16 2.6v7.8c0 .985-.57 1.885-1.475 2.326a2.717 2.717 0 0 1-2.792-.246L8 9.75v.65C8 11.836 6.805 13 5.333 13H2.667C1.193 13 0 11.836 0 10.4V2.6C0 1.165 1.193 0 2.667 0z"
            fill="#fff"
        />
    </Svg>
)

export default FastBackward
