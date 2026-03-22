import { useEffect, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { curriculum } from '../../data/curriculum'

interface Props {
  onSearchOpen: () => void
  onMenuOpen: () => void
}

function useFakeCoordinates() {
  const [coords, setCoords] = useState({ ra: 'RA 14h29m', dec: 'DEC +43°12′' })

  useEffect(() => {
    let step = 0
    const timer = setInterval(() => {
      step++
      const ra_h = 14 + (step % 24)
      const ra_m = (step * 7) % 60
      const dec = 43 + (step % 10)
      setCoords({
        ra: `RA ${ra_h.toString().padStart(2, '0')}h${ra_m.toString().padStart(2, '0')}m`,
        dec: `DEC +${dec}°12′`,
      })
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return coords
}

function getBreadcrumbFromPath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 0) return 'HOME'
  if (parts[0] === 'section') {
    const s = curriculum.find(c => c.id === parts[1])
    if (!s) return parts[1]?.toUpperCase() ?? ''
    if (parts[2]) {
      const entry = s.topics.flatMap(t => t.entries).find(e => e.slug === parts[2])
      return `${s.title.toUpperCase()} › ${entry?.title.toUpperCase() ?? parts[2].toUpperCase()}`
    }
    return s.title.toUpperCase()
  }
  return parts.map(p => p.toUpperCase()).join(' › ')
}

export default function TopBar({ onSearchOpen, onMenuOpen }: Props) {
  const location = useLocation()
  const coords = useFakeCoordinates()
  const breadcrumb = getBreadcrumbFromPath(location.pathname)

  const openSearch = useCallback(() => onSearchOpen(), [onSearchOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        openSearch()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [openSearch])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        zIndex: 100,
        background: 'rgba(5,5,8,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        gap: '1rem',
      }}
    >
      {/* Mobile hamburger */}
      <button
        onClick={onMenuOpen}
        style={{
          display: 'none',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--comet)',
          fontSize: '1.2rem',
          padding: '0.25rem',
        }}
        className="mobile-menu-btn"
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Logo */}
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexShrink: 0,
        }}
      >
        {/* Tiny orbital icon */}
        <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
          <div
            style={{
              position: 'absolute',
              inset: 2,
              borderRadius: '50%',
              border: '1.5px solid var(--pulsar)',
              borderTopColor: 'transparent',
              animation: 'orbit 2s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'var(--pulsar)',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 6px var(--pulsar)',
            }}
          />
        </div>
        <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.78rem', letterSpacing: '0.05em' }}>
          <span style={{ fontWeight: 700, color: 'var(--starlight)' }}>SINGULARITY</span>
          <span style={{ fontWeight: 400, color: 'var(--pulsar)' }}> LAB</span>
        </span>
      </Link>

      {/* Center breadcrumb (desktop only) */}
      <div
        className="desktop-breadcrumb"
        style={{
          flex: 1,
          textAlign: 'center',
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.6rem',
          color: 'var(--asteroid)',
          letterSpacing: '0.08em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {breadcrumb}
      </div>

      {/* Right: coordinates + search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        {/* Coordinates (desktop only) */}
        <div
          className="desktop-coords"
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.58rem',
            color: 'var(--asteroid)',
            letterSpacing: '0.06em',
            lineHeight: 1.3,
            textAlign: 'right',
          }}
        >
          <div style={{ color: 'var(--pulsar)', opacity: 0.7 }}>{coords.ra}</div>
          <div>{coords.dec}</div>
        </div>

        {/* Search button */}
        <button
          onClick={openSearch}
          aria-label="Search"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 34,
            height: 34,
            borderRadius: 6,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            color: 'var(--comet)',
            fontSize: '0.9rem',
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--pulsar)'
            e.currentTarget.style.color = 'var(--pulsar)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--comet)'
          }}
        >
          ⌕
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .desktop-breadcrumb { display: none !important; }
          .desktop-coords { display: none !important; }
        }
      `}</style>
    </header>
  )
}
