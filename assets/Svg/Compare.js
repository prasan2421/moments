import React from 'react'
import Svg, {G, Mask, Path} from "react-native-svg";

const Compare = props => (
    <Svg width={14} height={14} fill="none" {...props}>
        <Mask
            id="prefix__a"
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={14}
            height={14}
        >
            <Path d="M0 0h14v14H0V0z" fill="#fff" />
        </Mask>
        <G mask="url(#prefix__a)">
            <Path
                d="M1.75 8.75v-7h7a.875.875 0 1 0 1.75 0C10.5.787 9.713 0 8.75 0h-7C.787 0 0 .787 0 1.75v7c0 .963.787 1.75 1.75 1.75a.875.875 0 0 0 0-1.75zm3.5 3.5h7v-7h-7v7zm7-8.75h-7c-.963 0-1.75.787-1.75 1.75v7c0 .963.787 1.75 1.75 1.75h7c.963 0 1.75-.787 1.75-1.75v-7c0-.963-.787-1.75-1.75-1.75z"
                fill="#fff"
            />
        </G>
    </Svg>
)

export default Compare
