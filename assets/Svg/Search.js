import React from 'react'
import Svg, {Path} from "react-native-svg";

const Search = props => (
    <Svg width={16} height={16} fill="none" {...props}>
        <Path
            d="M12.93 13.586l-1.989-2V11h.583l1.989 2-.583.586zM5.968 10C3.771 10 1.99 8.209 1.99 6s1.781-4 3.978-4 3.979 1.791 3.979 4-1.782 4-3.979 4zm9.654 2.293l-2.983-3A.994.994 0 0 0 11.936 9h-.808c.51-.884.808-1.906.808-3 0-3.309-2.678-6-5.968-6C2.677 0 0 2.691 0 6s2.677 6 5.968 6a5.905 5.905 0 0 0 2.983-.811V12c0 .266.106.52.292.707l2.984 3a.988.988 0 0 0 1.406 0l1.989-2a1.003 1.003 0 0 0 0-1.414z"
            fill={props.fill}
        />
    </Svg>
)

export default Search
