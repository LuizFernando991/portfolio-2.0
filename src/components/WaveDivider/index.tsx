interface Props {
  from: string;
  to: string;
  flip?: boolean;
}

export default function WaveDivider({ from, to, flip = false }: Props) {
  const path = flip
    ? "M0,0 L1440,0 L1440,48 L0,16 Z"
    : "M0,0 L1440,0 L1440,16 L0,48 Z";

  return (
    <div aria-hidden="true" style={{ background: to, lineHeight: 0, marginTop: '-1px', marginBottom: '-1px' }}>
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '3rem' }}
      >
        <path d={path} fill={from} />
      </svg>
    </div>
  );
}
