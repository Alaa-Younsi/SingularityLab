import React from 'react'
import type { Discipline } from '../../types'

interface Props {
  discipline: Discipline
  size?: 'sm' | 'md'
}

const DISCIPLINE_CONFIG: Record<
  Discipline,
  { label: string; icon: string; color: string; bg: string; border: string }
> = {
  'computer-science': {
    label: 'CS',
    icon: '⬡',
    color: '#00b4d8',
    bg: 'rgba(0,180,216,0.12)',
    border: 'rgba(0,180,216,0.35)',
  },
  coding: {
    label: 'Code',
    icon: '◈',
    color: '#7b2fff',
    bg: 'rgba(123,47,255,0.12)',
    border: 'rgba(123,47,255,0.35)',
  },
  mathematics: {
    label: 'Math',
    icon: '∑',
    color: '#00d4aa',
    bg: 'rgba(0,212,170,0.12)',
    border: 'rgba(0,212,170,0.35)',
  },
  physics: {
    label: 'Physics',
    icon: '⚛',
    color: '#f72585',
    bg: 'rgba(247,37,133,0.12)',
    border: 'rgba(247,37,133,0.35)',
  },
  chess: {
    label: 'Chess',
    icon: '♟',
    color: '#f0c040',
    bg: 'rgba(240,192,64,0.12)',
    border: 'rgba(240,192,64,0.35)',
  },
}

const SectionBadge = React.memo(function SectionBadge({ discipline, size = 'md' }: Props) {
  const cfg = DISCIPLINE_CONFIG[discipline]
  const isSmall = size === 'sm'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSmall ? '0.25rem' : '0.375rem',
        padding: isSmall ? '0.15rem 0.5rem' : '0.2rem 0.6rem',
        borderRadius: '9999px',
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        color: cfg.color,
        fontFamily: '"Space Mono", monospace',
        fontSize: isSmall ? '0.6rem' : '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: isSmall ? '0.65rem' : '0.75rem' }}>{cfg.icon}</span>
      {cfg.label}
    </span>
  )
})

export default SectionBadge
