import React from 'react'
import {Path, Svg} from 'react-native-svg'

export const Arrow = props => (
    <Svg width={14} height={14} fill="none" {...props}>
        <Path
            opacity={0.6}
            d="M7 .333L5.825 1.508l4.65 4.659H.333v1.666h10.142l-4.65 4.659L7 13.667 13.667 7 7 .333z"
            fill={props.fill}
        />
    </Svg>
)

