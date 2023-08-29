import React from 'react'
import Svg, {Path} from "react-native-svg";

const Play = props => (
    <Svg width={38} height={38} fill="none" {...props}>
        <Path
            opacity={0.5}
            d="M19 38c10.493 0 19-8.507 19-19S29.493 0 19 0 0 8.507 0 19s8.507 19 19 19z"
            fill="#262628"
        />
        <Path
            d="M19 25a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-14c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm-2 11l5-3-5-3v6z"
            fill="#fff"
        />
    </Svg>
)

export default Play
