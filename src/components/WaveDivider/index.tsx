interface Props {
  from: string;
  to: string;
}

export default function WaveDivider({ from, to }: Props) {
  return (
    <div className="wave-divider" aria-hidden="true" style={{ background: from }}>
      <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          d="M0,32 C240,48 360,20 560,32 C780,46 940,20 1130,31 C1280,40 1370,30 1440,24 L1440,56 L0,56 Z"
          fill={to}
        />
        <path
          d="M0,39 C220,28 380,46 570,38 C760,30 930,42 1120,36 C1270,31 1360,38 1440,34 L1440,56 L0,56 Z"
          fill={to}
          opacity="0.42"
        />
      </svg>
    </div>
  );
}
