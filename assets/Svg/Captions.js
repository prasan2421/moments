import React from 'react'
import {Path, Svg} from "react-native-svg";

const Captions = props => (
    <Svg width={20} height={20} fill="none" {...props}>
        <Path
            d="M17.5 15h-5L10 17.5 7.5 15h-5V2.5h15V15zm0-15h-15A2.5 2.5 0 0 0 0 2.5V15a2.5 2.5 0 0 0 2.5 2.5h3.965l1.768 1.768A2.49 2.49 0 0 0 10 20a2.49 2.49 0 0 0 1.768-.732l1.767-1.768H17.5A2.5 2.5 0 0 0 20 15V2.5A2.5 2.5 0 0 0 17.5 0zm-3.75 10c.688 0 1.25-.562 1.25-1.25 0-.687-.563-1.25-1.25-1.25-.688 0-1.25.563-1.25 1.25 0 .688.563 1.25 1.25 1.25zM10 10c.688 0 1.25-.562 1.25-1.25 0-.687-.563-1.25-1.25-1.25-.688 0-1.25.563-1.25 1.25 0 .688.563 1.25 1.25 1.25zm-3.75 0c.688 0 1.25-.562 1.25-1.25 0-.687-.563-1.25-1.25-1.25C5.562 7.5 5 8.063 5 8.75 5 9.438 5.563 10 6.25 10z"
            fill={props.fill}
        />
    </Svg>
)

export default Captions
