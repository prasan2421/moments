import React from 'react'
import Svg, {G, Mask, Path} from "react-native-svg";

const FlipCamera = props => (
    <Svg width={22} height={20} fill="none" {...props}>
        <Mask
            id="prefix__a"
            maskUnits="userSpaceOnUse"
            x={5}
            y={8}
            width={12}
            height={6}
        >
            <Path d="M5.5 8.889h10.983v4.39H5.5V8.89z" fill="#fff" />
        </Mask>
        <G mask="url(#prefix__a)">
            <Path
                d="M16.48 11.038a.75.75 0 0 0-.033-.182c-.008-.024-.014-.049-.024-.071a.727.727 0 0 0-.136-.218l-1.373-1.463a.656.656 0 0 0-.972 0 .765.765 0 0 0 0 1.034l.202.215h-6.3l.2-.215a.764.764 0 0 0 0-1.034.655.655 0 0 0-.97 0L5.7 10.567a.775.775 0 0 0 0 1.035l1.374 1.463c.134.143.31.214.485.214a.661.661 0 0 0 .486-.214.765.765 0 0 0 0-1.034l-.2-.215h6.299l-.202.214a.766.766 0 0 0 0 1.035c.134.143.31.214.486.214a.665.665 0 0 0 .486-.214l1.373-1.463c.007-.007.008-.016.014-.023a.715.715 0 0 0 .135-.215v-.002c.003-.006.003-.013.005-.02a.78.78 0 0 0 .042-.23c0-.026-.002-.049-.003-.074z"
                fill="#fff"
            />
        </G>
        <Mask
            id="prefix__b"
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={23}
            height={20}
        >
            <Path d="M0 0h22v20H0V0z" fill="#fff" />
        </Mask>
        <G mask="url(#prefix__b)">
            <Path
                d="M19.25 17.143H2.75V5.714h4.125L8.25 2.857h5.5l1.375 2.857h4.125v11.429zm0-14.286h-2.425L16.21 1.58C15.744.61 14.792 0 13.75 0h-5.5C7.208 0 6.256.611 5.79 1.579l-.614 1.278H2.75C1.232 2.857 0 4.137 0 5.714v11.429C0 18.72 1.232 20 2.75 20h16.5c1.518 0 2.75-1.28 2.75-2.857V5.714c0-1.577-1.232-2.857-2.75-2.857z"
                fill="#fff"
            />
        </G>
    </Svg>
)

export default FlipCamera
