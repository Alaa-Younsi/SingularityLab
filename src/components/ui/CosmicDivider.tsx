import React from 'react'

interface Props {
  color?: string
}

const CosmicDivider = React.memo(function CosmicDivider({
  color = 'var(--border-glow)',
}: Props) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2rem 0',
        position: 'relative',
      }}
    >
      <svg
        width="100%"
        height="24"
        viewBox="0 0 600 24"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="cosmicGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left dashed line */}
        <line
          x1="0"
          y1="12"
          x2="265"
          y2="12"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="4 6"
          filter="url(#cosmicGlow)"
          opacity="0.6"
        />

        {/* Right dashed line */}
        <line
          x1="335"
          y1="12"
          x2="600"
          y2="12"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="4 6"
          filter="url(#cosmicGlow)"
          opacity="0.6"
        />

        {/* Center circle (planet) */}
        <circle
          cx="300"
          cy="12"
          r="7"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          filter="url(#cosmicGlow)"
        />

        {/* Planet ring */}
        <ellipse
          cx="300"
          cy="12"
          rx="12"
          ry="4"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.5"
          filter="url(#cosmicGlow)"
        />

        {/* Left diamond */}
        <polygon
          points="20,12 24,8 28,12 24,16"
          fill={color}
          opacity="0.4"
          filter="url(#cosmicGlow)"
        />

        {/* Right diamond */}
        <polygon
          points="572,12 576,8 580,12 576,16"
          fill={color}
          opacity="0.4"
          filter="url(#cosmicGlow)"
        />
      </svg>
    </div>
  )
})

export default CosmicDivider
