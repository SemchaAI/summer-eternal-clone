interface EmailSendIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
}
export const Facebook = ({
  size,
  width,
  height,
  stroke,
  fill,
  ...props
}: EmailSendIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 50 50"
      fill={fill}
      stroke={stroke}
      {...props}
    >
      <path d="M9 4C6.25 4 4 6.25 4 9v32c0 2.75 2.25 5 5 5h16.832a1 1 0 0 0 .326 0h5.674a1 1 0 0 0 .326 0H41c2.75 0 5-2.25 5-5V9c0-2.75-2.25-5-5-5H9zm0 2h32c1.668 0 3 1.332 3 3v32c0 1.668-1.332 3-3 3h-8V30h3.82l1.4-7H33v-2c0-.557.053-.601.24-.723.187-.121.766-.277 1.76-.277h3v-5.63l-.57-.272S35.133 13 32 13c-2.25 0-4.098.896-5.281 2.375C25.536 16.854 25 18.833 25 21v2h-3v7h3v14H9c-1.668 0-3-1.332-3-3V9c0-1.668 1.332-3 3-3zm23 9c2.08 0 3.387.458 4 .701V18h-1c-1.15 0-2.073.095-2.85.6-.776.504-1.15 1.461-1.15 2.4v4h4.78l-.6 3H31v16h-4V28h-3v-3h3v-4c0-1.833.464-3.354 1.281-4.375S30.25 15 32 15z"></path>
    </svg>
  );
};
