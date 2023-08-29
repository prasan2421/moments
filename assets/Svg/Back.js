import React from 'react'
import Svg, {G, Mask, Path} from "react-native-svg";

const Back = props => (
    <Svg width={18} height={15} fill="none" {...props}>
        <Mask
            id="prefix__a"
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={19}
            height={15}
        >
            <Path d="M18 0H.004v14.854H18V0z" fill="#fff" />
        </Mask>
        <G mask="url(#prefix__a)">
            <Path
                d="M.013 7.31c.011-.159.038-.313.088-.462.02-.062.036-.122.063-.182a1.82 1.82 0 0 1 .355-.552L5.921.546a1.759 1.759 0 0 1 2.547 0 1.893 1.893 0 0 1 0 2.623L6.138 5.57h10.06c.996 0 1.803.832 1.803 1.856 0 1.026-.807 1.858-1.802 1.858H6.139l2.329 2.4a1.896 1.896 0 0 1 0 2.625 1.76 1.76 0 0 1-2.547 0L.519 8.741C.501 8.724.499 8.7.483 8.683a1.804 1.804 0 0 1-.355-.546L.127 8.13C.12 8.117.12 8.1.116 8.083a1.891 1.891 0 0 1-.112-.587c-.002-.064.006-.124.01-.185z"
                fill="#fff"
            />
        </G>
    </Svg>
)

export default Back
