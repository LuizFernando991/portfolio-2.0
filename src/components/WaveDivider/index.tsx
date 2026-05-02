interface Props {
  from: string;
  to: string;
}

export default function WaveDivider({ from, to }: Props) {
  return (
    <div className="wave-divider" aria-hidden="true" style={{ background: from }}>
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
          fill={to}
        />
        <path
          d="M0,50 C200,10 400,70 600,50 C800,30 1000,70 1200,50 C1320,38 1400,55 1440,50 L1440,80 L0,80 Z"
          fill={to}
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
