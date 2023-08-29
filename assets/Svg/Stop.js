import React from 'react'
import Svg, {Defs, G, Path, Filter} from "react-native-svg";

const Stop = props => (
    <Svg width={92} height={92} fill="none" {...props}>
        <G filter="url(#prefix__filter0_d)">
            <Path d="M72 20H20v52h52V20z" fill="#fff" />
            <Path d="M66 26H26v40h40V26z" fill="#FF6A71" />
        </G>
        <Defs>
            <filter
                id="prefix__filter0_d"
                x={0}
                y={0}
                width={92}
                height={92}
                filterUnits="userSpaceOnUse"
            >
                <feFlood result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset />
                <feGaussianBlur stdDeviation={10} />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
        </Defs>
    </Svg>
)

export default Stop
