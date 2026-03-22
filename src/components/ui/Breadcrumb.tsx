import { Link } from 'react-router-dom'
import React from 'react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

const Breadcrumb = React.memo(function Breadcrumb({ items }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.25rem',
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.7rem',
        color: 'var(--asteroid)',
        marginBottom: '1.5rem',
      }}
    >
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {i > 0 && (
            <span style={{ color: 'var(--border-glow)', margin: '0 0.1rem' }}>›</span>
          )}
          {item.href ? (
            <Link
              to={item.href}
              style={{
                color: 'var(--asteroid)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => {
                ;(e.target as HTMLAnchorElement).style.color = 'var(--pulsar)'
              }}
              onMouseLeave={e => {
                ;(e.target as HTMLAnchorElement).style.color = 'var(--asteroid)'
              }}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: 'var(--comet)' }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
})

export default Breadcrumb
