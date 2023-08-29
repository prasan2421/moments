import React from 'react'
import {Path, Svg} from "react-native-svg";

const Cut = props => (
    <Svg width={20} height={20} fill="none" {...props}>
        <Path
            d="M3.726 14.463c-.685 0-1.243-.54-1.243-1.206 0-.475.291-.877.703-1.073.032-.015.062-.032.095-.044.138-.052.286-.087.445-.087.682 0 1.241.541 1.241 1.204 0 .666-.558 1.206-1.241 1.206zm0-9.641a1.23 1.23 0 0 1-.445-.09c-.033-.01-.063-.028-.094-.043-.413-.195-.704-.598-.704-1.073 0-.664.558-1.206 1.243-1.206.683 0 1.241.542 1.241 1.206 0 .663-.559 1.206-1.241 1.206zm7.896 3.614l7.799-6.303a1.194 1.194 0 0 0 .162-1.7 1.282 1.282 0 0 0-1.752-.157L9.686 6.87 7.214 4.87l-.006-.005c.149-.39.241-.807.241-1.248C7.45 1.622 5.78 0 3.726 0 1.67 0 0 1.622 0 3.616S1.67 7.23 3.726 7.23c.691 0 1.331-.196 1.887-.515l.013.01 2.122 1.71-2.122 1.711-.013.011a3.765 3.765 0 0 0-1.887-.516C1.67 9.642 0 11.263 0 13.257c0 1.994 1.67 3.616 3.725 3.616 2.053 0 3.723-1.622 3.723-3.616 0-.44-.092-.857-.24-1.248l.005-.005 2.472-2 8.145 6.592c.236.181.509.277.795.277.36 0 .707-.144.957-.433a1.191 1.191 0 0 0-.162-1.699l-7.799-6.305z"
            fill={props.fill}
        />
    </Svg>
)

export default Cut