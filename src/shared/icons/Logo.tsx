type IconProps = React.SVGProps<SVGSVGElement>;

export function Logo(props: IconProps) {
  return (
    <svg viewBox="0 0 320 96" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="oklch(0.5417 0.1790 288.0332)" />
          <stop offset="100%" stopColor="oklch(0.7042 0.1602 288.9880)" />
        </linearGradient>
      </defs>

      <g transform="translate(96 0)">
        <text
          x="0"
          y="58"
          fill="currentColor"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="42"
          fontWeight="700"
          letterSpacing="-0.04em"
        >
          GrSSO
        </text>

        <text
          x="2"
          y="78"
          fill="#8B8B96"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="12"
          fontWeight="500"
          letterSpacing="0.18em"
        >
          AUTHENTICATION PLATFORM
        </text>
      </g>

      <g transform="translate(0 10)">
        <rect
          x="0"
          y="0"
          width="80"
          height="80"
          rx="22"
          fill="url(#logo-gradient)"
        />

        <path
          d="M54 25 A22 22 0 1 0 54 55 L42 55"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        <path
          d="M42 49 L56 40 L42 31"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}