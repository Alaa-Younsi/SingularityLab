import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { curriculum } from '../../data/curriculum'
import type { Entry } from '../../types'
import SectionBadge from './SectionBadge'

interface Props {
  open: boolean
  onClose: () => void
}

interface SearchResult {
  entry: Entry
  excerpt: string
}

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const allEntries = useMemo(
    () => curriculum.flatMap(s => s.topics.flatMap(t => t.entries)),
    []
  )

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return allEntries
      .filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.subtitle.toLowerCase().includes(q) ||
        e.tags.some(tag => tag.toLowerCase().includes(q)) ||
        e.content.some(
          b => b.type === 'paragraph' && b.content?.toLowerCase().includes(q)
        )
      )
      .slice(0, 12)
      .map(entry => {
        const firstPara = entry.content.find(b => b.type === 'paragraph')
        return {
          entry,
          excerpt: (firstPara?.content ?? entry.subtitle).slice(0, 100) + '…',
        }
      })
  }, [query, allEntries])

  const handleSelect = useCallback(
    (entry: Entry) => {
      navigate(`/section/${entry.sectionId}/${entry.slug}`)
      onClose()
      setQuery('')
    },
    [navigate, onClose]
  )

  useEffect(() => {
    setActiveIndex(0)
  }, [results])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setActiveIndex(0)
    }
  }, [open])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (!open) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex(i => Math.min(i + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex(i => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && results[activeIndex]) {
        handleSelect(results[activeIndex].entry)
      }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [open, results, activeIndex, handleSelect, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(5,5,8,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '10vh',
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: 640,
              background: 'var(--surface)',
              border: '1px solid var(--border-glow)',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 0 40px rgba(0,180,216,0.15)',
            }}
          >
            {/* Search input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1rem',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span style={{ color: 'var(--pulsar)', fontSize: '1rem' }}>⌕</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search knowledge base..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.9rem',
                  color: 'var(--starlight)',
                }}
              />
              <kbd
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.65rem',
                  color: 'var(--asteroid)',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  padding: '0.15rem 0.4rem',
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div style={{ maxHeight: 400, overflowY: 'auto' }}>
              {query.trim() && results.length === 0 && (
                <div
                  style={{
                    padding: '2rem',
                    textAlign: 'center',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.75rem',
                    color: 'var(--asteroid)',
                  }}
                >
                  NO RESULTS FOR "{query.toUpperCase()}"
                </div>
              )}
              {results.map((r, i) => (
                <button
                  key={r.entry.id}
                  onClick={() => handleSelect(r.entry)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    background: i === activeIndex ? 'var(--surface-alt)' : 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.3rem',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <SectionBadge discipline={r.entry.sectionId as Parameters<typeof SectionBadge>[0]['discipline']} size="sm" />
                    <span
                      style={{
                        fontFamily: '"Orbitron", sans-serif',
                        fontSize: '0.78rem',
                        color: 'var(--starlight)',
                        fontWeight: 600,
                      }}
                    >
                      {r.entry.title}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'Sora, sans-serif',
                      fontSize: '0.72rem',
                      color: 'var(--asteroid)',
                      lineHeight: 1.4,
                    }}
                  >
                    {r.excerpt}
                  </span>
                </button>
              ))}

              {!query.trim() && (
                <div
                  style={{
                    padding: '1.5rem',
                    textAlign: 'center',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.7rem',
                    color: 'var(--asteroid)',
                  }}
                >
                  TYPE TO SEARCH ACROSS ALL {allEntries.length} ENTRIES
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--nebula)',
                display: 'flex',
                gap: '1rem',
                borderTop: '1px solid var(--border)',
              }}
            >
              {[
                ['↑↓', 'navigate'],
                ['↵', 'select'],
                ['esc', 'close'],
              ].map(([key, label]) => (
                <span
                  key={key}
                  style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.6rem', color: 'var(--asteroid)' }}
                >
                  <kbd
                    style={{
                      border: '1px solid var(--border)',
                      borderRadius: 3,
                      padding: '0.1rem 0.3rem',
                      marginRight: '0.25rem',
                      color: 'var(--comet)',
                    }}
                  >
                    {key}
                  </kbd>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
