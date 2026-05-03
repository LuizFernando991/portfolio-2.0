interface Props {
  from: string;
  to: string;
}

export default function WaveDivider({ from, to }: Props) {
  return (
    <div aria-hidden="true" style={{ background: to, lineHeight: 0, marginTop: '-1px', marginBottom: '-1px' }}>
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '4rem' }}
      >
        <path d="M0,0 L0,40 C480,72 960,8 1440,40 L1440,0 Z" fill={from} />
      </svg>
    </div>
  );
}
