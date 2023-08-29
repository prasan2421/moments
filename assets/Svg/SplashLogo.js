import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const SvgComponent = props => (
  <Svg width={267} height={84} viewBox="0 0 267 84" fill="none" {...props}>
    <G clipPath="url(#prefix__clip0)">
      <Path
        d="M23.42 67.776C3.12 67.776 0 53.853 0 50.492c0-2.38 1.88-5.161 5.4-5.161 3.28 0 4.18 2.22 5.98 6.381.98 2.38 3.44 7.382 11.62 7.382 5.66 0 11.96-2.62 11.96-8.602 0-6.382-6.72-7.942-14-9.582-8.6-2.04-11.46-3.441-14.1-5.502-2.94-2.38-5.74-6.141-5.74-11.883 0-9.822 8.2-16.383 22.04-16.383 17.54 0 20.98 11.222 20.98 14.343 0 2.22-1.88 5.501-5.4 5.501-3.2 0-4.26-2.12-5.82-5.32-.98-1.961-2.94-6.062-10.48-6.062-5 0-10.24 2.2-10.24 6.881 0 5.242 6.56 6.722 12.7 8.182 9.74 2.3 13.18 3.941 16.3 6.382 4.5 3.52 5.4 9.182 5.4 12.123 0 10.262-7.94 18.604-23.18 18.604zM79.98 23.366c12.04 0 18.26 10.322 18.26 22.705 0 11.063-5.5 21.705-18.18 21.705-7.86 0-11.8-4.18-14.34-6.801v14.263c0 4.581 0 8.762-5.4 8.762-3.2 0-5.5-1.4-5.5-9.102v-43.09c0-6.382 1.48-8.442 5.5-8.442 5.16 0 5.4 4.42 5.4 6.141v1.14c2.46-2.86 6.14-7.281 14.26-7.281zM66.38 45.09c0 8.782 4.18 14.343 10.82 14.343 5.32 0 10-4.34 10-13.603 0-7.042-1.88-9.422-3.52-11.143-2.38-2.54-4.66-2.94-6.56-2.94-5.34-.02-10.74 3.84-10.74 13.343zM126.519 67.776c-16.48 0-22.04-12.123-22.04-22.205 0-11.543 6.96-22.205 21.78-22.205 14.98 0 21.78 10.822 21.78 22.205.02 12.463-7.92 22.205-21.52 22.205zm-.24-36.288c-6.38 0-10.74 5.08-10.74 14.083 0 9.182 4.34 14.103 10.74 14.103 6.38 0 10.74-5 10.74-14.103 0-9.102-4.36-14.083-10.74-14.083z"
        fill="#000"
      />
      <Path
        d="M169.721 57.954c0 4.26.08 6.381-1.48 8.022-.9.9-2.38 1.8-4.34 1.8-1.56 0-3.2-.64-4.42-1.8-1.64-1.48-1.56-3.861-1.56-8.022v-40.97c0-4.261 0-6.382 1.56-7.942.9-.9 2.38-1.88 4.34-1.88 1.56 0 3.2.64 4.34 1.8 1.64 1.64 1.56 3.861 1.56 8.022v40.97z"
        fill="gray"
      />
      <Path
        d="M237.14 63.515c3.52 1.96 3.94 3.1 3.94 4.421 0 2.38-1.96 4.261-3.94 4.261-3.36 0-9.34-4.26-13.68-7.382-5.66 2.861-12.36 2.941-14.26 2.941-22.52 0-28.74-17.124-28.74-30.067 0-16.884 8.76-30.567 28.42-30.567 23.52.02 28.92 17.884 28.92 30.267 0 2.12 0 14.003-7.46 22.125 2.06 1.38 2.54 1.64 6.8 4.001zm-11.38-26.046c0-4.661-.74-11.543-5.24-16.224-3.6-3.761-8.44-4.661-11.8-4.661-2.78 0-16.22.98-16.22 20.885 0 4.52.64 9.102 2.86 13.023 2.86 5.081 8.1 7.862 13.68 7.862 3.2 0 5.32-.9 6.14-1.22-1.22-.9-2.3-1.72-5.08-2.941-3.36-1.48-4.5-2.62-4.5-4.261 0-1.08 1.22-2.94 3.02-2.94 3.86 0 10.74 4.92 12.36 6.06 3.72-4.28 4.78-10.022 4.78-15.583z"
        fill="#000"
      />
      <Path
        d="M163.82 23.366c6.46 0 11.68-5.242 11.68-11.683C175.5 5.24 170.28 0 163.82 0s-11.68 5.241-11.68 11.683c0 6.441 5.22 11.683 11.68 11.683z"
        fill="#ED2024"
      />
      <Path
        d="M252.88 10.502h-2.64v8.702c0 .5-.12.88-.34 1.12-.22.24-.52.36-.86.36-.36 0-.66-.12-.88-.36-.22-.24-.34-.62-.34-1.12v-8.702h-2.64c-.42 0-.72-.1-.92-.28-.2-.18-.3-.42-.3-.72 0-.32.1-.56.32-.74.2-.18.52-.26.92-.26h7.72c.42 0 .74.1.94.28.2.18.3.42.3.72s-.1.54-.32.72c-.24.18-.56.28-.96.28zM259.6 18.684l-1.92-7.641v8.262c0 .46-.1.8-.3 1.02-.2.22-.48.34-.82.34-.32 0-.6-.12-.8-.34-.2-.22-.32-.58-.32-1.04V9.842c0-.52.14-.88.4-1.06.28-.18.64-.28 1.1-.28h.76c.46 0 .78.04.98.12.2.08.36.22.46.44.1.22.2.56.34 1.04l1.74 6.562 1.74-6.562c.12-.48.24-.82.34-1.04.1-.22.24-.36.46-.44.22-.08.54-.12.98-.12h.76c.46 0 .84.1 1.1.28.28.18.4.54.4 1.06v9.482c0 .46-.1.8-.3 1.02-.2.22-.48.34-.82.34-.32 0-.58-.12-.8-.34-.2-.22-.32-.58-.32-1.02v-8.281l-1.92 7.641c-.12.5-.22.86-.3 1.1-.08.24-.22.44-.44.64s-.5.28-.88.28c-.28 0-.52-.06-.72-.18-.2-.12-.34-.28-.46-.46-.1-.2-.2-.4-.26-.64-.06-.26-.12-.5-.18-.74z"
        fill="#000"
      />
    </G>
    <Defs>
      <ClipPath id="prefix__clip0">
        <Path d="M0 0h267v84H0V0z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;