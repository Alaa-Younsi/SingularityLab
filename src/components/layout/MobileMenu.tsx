import { useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { curriculum } from '../../data/curriculum'
import type { Discipline } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
  onSearchOpen: () => void
}

const DISCIPLINE_COLORS: Record<Discipline, string> = {
  'computer-science': '#00b4d8',
  coding: '#7b2fff',
  mathematics: '#00d4aa',
  physics: '#f72585',
  chess: '#f0c040',
}

export default function MobileMenu({ open, onClose, onSearchOpen }: Props) {
  const location = useLocation()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggle = useCallback((id: string) => {
    setExpanded(p => ({ ...p, [id]: !p[id] }))
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5,5,8,0.75)',
              zIndex: 199,
            }}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'tween', duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 280,
              height: '100vh',
              background: 'var(--constellation)',
              borderRight: '1px solid var(--border)',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--starlight)', fontWeight: 700 }}>SINGULARITY</span>
                <span style={{ color: 'var(--pulsar)' }}> LAB</span>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--comet)',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  padding: '0.25rem',
                }}
              >
                ✕
              </button>
            </div>

            {/* Search */}
            <div style={{ padding: '0.75rem 1rem' }}>
              <button
                onClick={() => { onSearchOpen(); onClose() }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.65rem',
                  color: 'var(--asteroid)',
                }}
              >
                <span style={{ color: 'var(--pulsar)' }}>⌕</span>
                Search knowledge base...
              </button>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: '0.5rem 0' }}>
              <Link
                to="/"
                onClick={onClose}
                style={{
                  display: 'block',
                  padding: '0.5rem 1rem',
                  textDecoration: 'none',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.7rem',
                  color: location.pathname === '/' ? 'var(--pulsar)' : 'var(--comet)',
                }}
              >
                ◈ Home
              </Link>

              {curriculum.map(section => {
                const color = DISCIPLINE_COLORS[section.discipline]
                const isOpen = expanded[section.id]
                return (
                  <div key={section.id}>
                    <button
                      onClick={() => toggle(section.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.5rem 1rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '0.62rem',
                        fontVariant: 'small-caps',
                        letterSpacing: '0.08em',
                        color: 'var(--starlight)',
                        textAlign: 'left',
                        gap: '0.5rem',
                      }}
                    >
                      <span style={{ color }}>{section.icon}</span>
                      <span style={{ flex: 1 }}>{section.title}</span>
                      <span>{isOpen ? '▾' : '▸'}</span>
                    </button>

                    {isOpen && (
                      <div>
                        {section.topics.flatMap(topic =>
                          topic.entries.map(entry => {
                            const active =
                              location.pathname === `/section/${section.id}/${entry.slug}`
                            return (
                              <Link
                                key={entry.id}
                                to={`/section/${section.id}/${entry.slug}`}
                                onClick={onClose}
                                style={{
                                  display: 'block',
                                  padding: '0.35rem 1rem 0.35rem 2.5rem',
                                  textDecoration: 'none',
                                  fontFamily: '"Space Mono", monospace',
                                  fontSize: '0.62rem',
                                  color: active ? color : 'var(--asteroid)',
                                  borderLeft: active ? `2px solid ${color}` : '2px solid transparent',
                                }}
                              >
                                {entry.title}
                              </Link>
                            )
                          })
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
