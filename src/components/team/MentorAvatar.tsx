const PALETTE = ["#7c3aed", "#a78bfa", "#4c1d95"];

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededLook(name: string) {
  const hash = hashString(name);
  const pick = (shift: number, mod: number) => (hash >>> shift) % mod;

  const colorA = PALETTE[pick(0, PALETTE.length)];
  const colorB = PALETTE[(pick(6, PALETTE.length) + 1) % PALETTE.length];

  return {
    id: `mentor-${hash}`,
    colorA,
    colorB,
    angle: pick(12, 360),
    blobX: 20 + pick(16, 55),
    blobY: 15 + pick(20, 50),
    blobR: 32 + pick(24, 22),
  };
}

/**
 * Avatar gerado a partir do nome (blobs abstratos na paleta da marca) —
 * usado como retrato ilustrativo enquanto o mentor não tem foto real
 * (mentor.image ausente).
 */
export default function MentorAvatar({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const { id, colorA, colorB, angle, blobX, blobY, blobR } =
    seededLook(name);

  return (
    <svg
      role="img"
      aria-label={`Foto de ${name}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={`size-full ${className}`}
    >
      <defs>
        <linearGradient id={id} gradientTransform={`rotate(${angle} .5 .5)`}>
          <stop offset="0%" stopColor="#14101c" />
          <stop offset="100%" stopColor="#0d0a12" />
        </linearGradient>
        <filter id={`${id}-blur`}>
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <rect width="100" height="100" fill={`url(#${id})`} />

      <circle
        cx={blobX}
        cy={blobY}
        r={blobR}
        fill={colorA}
        opacity="0.55"
        filter={`url(#${id}-blur)`}
      />
      <circle
        cx={100 - blobX}
        cy={100 - blobY * 0.6}
        r={blobR * 0.7}
        fill={colorB}
        opacity="0.45"
        filter={`url(#${id}-blur)`}
      />
    </svg>
  );
}
