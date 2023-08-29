import React from 'react'
import {Path, Svg} from "react-native-svg";

const Circle = props => (
    <Svg width={20} height={20} fill="none" {...props}>
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5 10C2.5 5.8575 5.85875 2.5 10 2.5C14.1425 2.5 17.5 5.8575 17.5 10C17.5 14.1413 14.1425 17.5 10 17.5C5.85875 17.5 2.5 14.1412 2.5 10ZM20 10C20 4.48625 15.5138 -1.961e-07 10 -4.37114e-07C4.48625 -6.78128e-07 -1.961e-07 4.48625 -4.37114e-07 10C-6.78128e-07 15.5137 4.48625 20 10 20C15.5137 20 20 15.5138 20 10Z"
            fill={props.fill}
        />
    </Svg>
)

export default Circle
