import React from 'react'
import {Path, Svg} from "react-native-svg";

const Edit = props => (
    <Svg width={16} height={16} fill="none" {...props}>
        <Path
            d="M3.996 14H1.998v-2l7.785-7.793 1.998 2L3.996 14zm9.99-10l-.792.793-1.998-2L11.988 2l1.998 2zM15.4 2.586l-1.998-2A1.99 1.99 0 0 0 11.988 0a1.99 1.99 0 0 0-1.413.586l-9.99 10A2 2 0 0 0 0 12v2c0 1.104.894 2 1.998 2h1.998c.53 0 1.038-.211 1.413-.586l9.99-10c.78-.781.78-2.047 0-2.828z"
            fill="#fff"
        />
    </Svg>
)

export default Edit
