import React from 'react'
import Svg, {Path} from "react-native-svg";

const FastForward = props => (
    <Svg width={16} height={13} fill="none" {...props}>
        <Path
            d="M10.667 10.4h2.666V2.6h-2.666v7.8zm-8 0V2.6L8 6.5l-5.333 3.9zM13.333 0h-2.666C9.195 0 8 1.165 8 2.6v.65L4.267.52a2.707 2.707 0 0 0-1.6-.52c-.407 0-.815.09-1.192.274A2.593 2.593 0 0 0 0 2.6v7.8c0 .985.57 1.885 1.475 2.326a2.716 2.716 0 0 0 2.792-.246L8 9.75v.65c0 1.436 1.195 2.6 2.667 2.6h2.666C14.807 13 16 11.836 16 10.4V2.6C16 1.165 14.807 0 13.333 0z"
            fill="#fff"
        />
    </Svg>
)

export default FastForward
