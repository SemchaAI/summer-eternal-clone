interface EmailSendIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
}
export const Mail = ({
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
      viewBox="0 0 32 32"
      fill={fill}
      stroke={stroke}
      {...props}
    >
      <g data-name="21-Email-Send">
        <path d="M29 4H3a3 3 0 0 0-3 3v4h2V7.23l13.42 9.58a1 1 0 0 0 1.16 0L30 7.23V25a1 1 0 0 1-1 1H4v2h25a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3M16 14.77 3.72 6h24.56ZM0 26h2v2H0z" />
        <path d="M0 21h14v2H0zm16 0h2v2h-2zM0 16h2v2H0zm4 0h6v2H4z" />
      </g>
    </svg>
  );
};
