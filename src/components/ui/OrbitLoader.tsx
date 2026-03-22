export default function OrbitLoader() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'var(--deep)',
        gap: '1.5rem',
      }}
    >
      {/* Orbital rings container */}
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        {/* Outer ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: 'var(--pulsar)',
            borderRightColor: 'var(--pulsar)',
            animation: 'orbit 1.6s linear infinite',
            boxShadow: '0 0 10px rgba(0,180,216,0.4)',
          }}
        />
        {/* Inner ring */}
        <div
          style={{
            position: 'absolute',
            inset: 14,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: 'var(--quasar)',
            borderLeftColor: 'var(--quasar)',
            animation: 'orbitReverse 1.1s linear infinite',
            boxShadow: '0 0 8px rgba(123,47,255,0.4)',
          }}
        />
        {/* Center dot */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--pulsar)',
            boxShadow: '0 0 8px var(--pulsar)',
          }}
        />
      </div>

      {/* Loading text */}
      <div
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.75rem',
          color: 'var(--asteroid)',
          letterSpacing: '0.15em',
        }}
      >
        LOADING
        <span
          style={{
            animation: 'blink 1s step-start infinite',
            color: 'var(--pulsar)',
          }}
        >
          ▌
        </span>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
