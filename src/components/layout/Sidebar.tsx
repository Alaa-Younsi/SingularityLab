import { useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { curriculum } from '../../data/curriculum'
import type { Discipline } from '../../types'

interface Props {
  onSearchOpen: () => void
}

const DISCIPLINE_COLORS: Record<Discipline, string> = {
  'computer-science': '#00b4d8',
  coding: '#7b2fff',
  mathematics: '#00d4aa',
  physics: '#f72585',
  chess: '#f0c040',
}

export default function Sidebar({ onSearchOpen }: Props) {
  const location = useLocation()
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    curriculum.forEach(s => { init[s.id] = true })
    return init
  })
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    curriculum.forEach(s => s.topics.forEach(t => { init[t.id] = true }))
    return init
  })

  const toggleSection = useCallback((id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const toggleTopic = useCallback((id: string) => {
    setExpandedTopics(prev => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const isEntryActive = (sectionId: string, slug: string) =>
    location.pathname === `/section/${sectionId}/${slug}`

  const isSectionActive = (sectionId: string) =>
    location.pathname.startsWith(`/section/${sectionId}`)

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 260,
        height: '100vh',
        background: 'var(--constellation)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {/* Top logo area */}
      <div
        style={{
          padding: '1.25rem 1rem 0.75rem',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}
      >
        <Link
          to="/"
          style={{ textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}
        >
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
            <span style={{ color: 'var(--starlight)', fontWeight: 700 }}>SINGULARITY</span>
            <span style={{ color: 'var(--pulsar)', fontWeight: 400 }}> LAB</span>
          </div>
          <div
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              color: 'var(--asteroid)',
              letterSpacing: '0.15em',
              marginTop: '0.2rem',
            }}
          >
            KNOWLEDGE BASE
          </div>
        </Link>

        {/* Search shortcut */}
        <button
          onClick={onSearchOpen}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.6rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            cursor: 'pointer',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.65rem',
            color: 'var(--asteroid)',
            transition: 'border-color 0.15s',
            marginTop: '0.5rem',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-glow)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
        >
          <span style={{ color: 'var(--pulsar)' }}>⌕</span>
          <span style={{ flex: 1, textAlign: 'left' }}>Search...</span>
          <kbd
            style={{
              border: '1px solid var(--border)',
              borderRadius: 3,
              padding: '0.1rem 0.3rem',
              fontSize: '0.6rem',
            }}
          >
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '0.75rem 0',
        }}
      >
        {/* Home link */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            textDecoration: 'none',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.7rem',
            color: location.pathname === '/' ? 'var(--pulsar)' : 'var(--comet)',
            background: location.pathname === '/' ? 'rgba(0,180,216,0.08)' : 'transparent',
            borderLeft: location.pathname === '/' ? '2px solid var(--pulsar)' : '2px solid transparent',
            transition: 'color 0.15s',
          }}
        >
          <span>◈</span> Home
        </Link>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'var(--border)',
            margin: '0.5rem 1rem',
            opacity: 0.5,
          }}
        />

        {/* Discipline sections */}
        {curriculum.map(section => {
          const color = DISCIPLINE_COLORS[section.discipline]
          const isOpen = expanded[section.id]
          const isActive = isSectionActive(section.id)

          return (
            <div key={section.id}>
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 1rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.6rem',
                  fontVariant: 'small-caps',
                  letterSpacing: '0.1em',
                  color: isActive ? color : 'var(--starlight)',
                  textAlign: 'left',
                  transition: 'color 0.15s',
                }}
              >
                <span style={{ fontSize: '0.85rem', color }}>{section.icon}</span>
                <span style={{ flex: 1 }}>{section.title}</span>
                <span
                  style={{
                    fontSize: '0.5rem',
                    color: 'var(--asteroid)',
                    transition: 'transform 0.2s',
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  }}
                >
                  ▶
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="section-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    {section.topics.map(topic => {
                      const isTopicOpen = expandedTopics[topic.id]
                      return (
                        <div key={topic.id}>
                          {/* Topic header */}
                          <button
                            onClick={() => toggleTopic(topic.id)}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              padding: '0.3rem 1rem 0.3rem 2rem',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              fontFamily: '"Space Mono", monospace',
                              fontSize: '0.62rem',
                              color: 'var(--comet)',
                              textAlign: 'left',
                              gap: '0.4rem',
                            }}
                          >
                            <span style={{ color: 'var(--asteroid)', fontSize: '0.55rem' }}>
                              {isTopicOpen ? '▾' : '▸'}
                            </span>
                            <span>{topic.title}</span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isTopicOpen && (
                              <motion.div
                                key="topic-body"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                style={{ overflow: 'hidden' }}
                              >
                                {topic.entries.map(entry => {
                                  const active = isEntryActive(section.id, entry.slug)
                                  return (
                                    <Link
                                      key={entry.id}
                                      to={`/section/${section.id}/${entry.slug}`}
                                      style={{
                                        display: 'block',
                                        padding: '0.28rem 1rem 0.28rem 3rem',
                                        textDecoration: 'none',
                                        fontFamily: '"Space Mono", monospace',
                                        fontSize: '0.6rem',
                                        color: active ? color : 'var(--asteroid)',
                                        background: active ? `${color}12` : 'transparent',
                                        borderLeft: active
                                          ? `2px solid ${color}`
                                          : '2px solid transparent',
                                        transition: 'color 0.15s, background 0.15s',
                                        lineHeight: 1.4,
                                      }}
                                      onMouseEnter={e => {
                                        if (!active) {
                                          e.currentTarget.style.color = 'var(--starlight)'
                                        }
                                      }}
                                      onMouseLeave={e => {
                                        if (!active) {
                                          e.currentTarget.style.color = 'var(--asteroid)'
                                        }
                                      }}
                                    >
                                      {entry.title}
                                    </Link>
                                  )
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
