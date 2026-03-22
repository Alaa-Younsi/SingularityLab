import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import CosmicDivider from '../components/ui/CosmicDivider'
import SectionBadge from '../components/ui/SectionBadge'
import { curriculum, getRecentEntries, getTotalStats } from '../data/curriculum'
import type { Discipline } from '../types'
import { absoluteUrl } from '../utils/seo'

const DISCIPLINE_COLORS: Record<Discipline, string> = {
  'computer-science': '#00b4d8',
  coding: '#7b2fff',
  mathematics: '#00d4aa',
  physics: '#f72585',
  chess: '#f0c040',
}

const DIFFICULTY_COLORS = {
  beginner: '#00d4aa',
  intermediate: '#f0c040',
  advanced: '#f72585',
}

function DisciplineCard({ section, index }: { section: typeof curriculum[0]; index: number }) {
  const navigate = useNavigate()
  const color = DISCIPLINE_COLORS[section.discipline]
  const totalEntries = section.topics.reduce((a, t) => a + t.entries.length, 0)

  const difficulties = useMemo(() => {
    const entries = section.topics.flatMap(t => t.entries)
    const b = entries.filter(e => e.difficulty === 'beginner').length
    const i = entries.filter(e => e.difficulty === 'intermediate').length
    const a = entries.filter(e => e.difficulty === 'advanced').length
    return { beginner: b, intermediate: i, advanced: a, total: entries.length }
  }, [section])

  const handleClick = useCallback(() => {
    navigate(`/section/${section.id}`)
  }, [navigate, section.id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onClick={handleClick}
      style={{
        background: `radial-gradient(ellipse at top left, ${color}14 0%, var(--surface) 60%)`,
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onHoverStart={e => {
        const el = e.target as HTMLElement
        el.style.borderColor = color
        el.style.transform = 'scale(1.02)'
        el.style.boxShadow = `0 0 24px ${color}30`
      }}
      onHoverEnd={e => {
        const el = e.target as HTMLElement
        el.style.borderColor = 'var(--border)'
        el.style.transform = 'scale(1)'
        el.style.boxShadow = 'none'
      }}
      whileHover={{ scale: 1.02, borderColor: color } as Parameters<typeof motion.div>[0]['whileHover']}
    >
      {/* Icon */}
      <div
        style={{
          fontSize: '2rem',
          marginBottom: '0.75rem',
          filter: `drop-shadow(0 0 8px ${color}80)`,
          lineHeight: 1,
        }}
      >
        {section.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '0.9rem',
          fontWeight: 700,
          color: 'var(--starlight)',
          margin: '0 0 0.4rem',
          letterSpacing: '0.05em',
        }}
      >
        {section.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '0.78rem',
          color: 'var(--comet)',
          margin: '0 0 1rem',
          lineHeight: 1.6,
        }}
      >
        {section.description}
      </p>

      {/* Entry count */}
      <div
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.62rem',
          color: color,
          marginBottom: '0.75rem',
          letterSpacing: '0.1em',
        }}
      >
        {String(totalEntries).padStart(2, '0')} ENTRIES
      </div>

      {/* Difficulty spectrum */}
      <div style={{ display: 'flex', gap: 3 }}>
        {difficulties.beginner > 0 && (
          <div
            title={`${difficulties.beginner} beginner`}
            style={{
              height: 3,
              flex: difficulties.beginner,
              background: DIFFICULTY_COLORS.beginner,
              borderRadius: 2,
              opacity: 0.7,
            }}
          />
        )}
        {difficulties.intermediate > 0 && (
          <div
            title={`${difficulties.intermediate} intermediate`}
            style={{
              height: 3,
              flex: difficulties.intermediate,
              background: DIFFICULTY_COLORS.intermediate,
              borderRadius: 2,
              opacity: 0.7,
            }}
          />
        )}
        {difficulties.advanced > 0 && (
          <div
            title={`${difficulties.advanced} advanced`}
            style={{
              height: 3,
              flex: difficulties.advanced,
              background: DIFFICULTY_COLORS.advanced,
              borderRadius: 2,
              opacity: 0.7,
            }}
          />
        )}
      </div>
    </motion.div>
  )
}

export default function Home() {
  const recent = useMemo(() => getRecentEntries(5), [])
  const stats = useMemo(() => getTotalStats(), [])
  const navigate = useNavigate()
  const canonical = absoluteUrl('/')

  return (
    <Layout>
      <Helmet>
        <title>SingularityLab | Knowledge Base</title>
        <meta
          name="description"
          content="A living learning journal across Computer Science, Coding, Mathematics, Physics, and Chess. Built in the spirit of a deep-space research terminal."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content="SingularityLab | Knowledge Base" />
        <meta
          property="og:description"
          content="A living learning journal across Computer Science, Coding, Mathematics, Physics, and Chess."
        />
        <meta property="og:site_name" content="SingularityLab" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SingularityLab | Knowledge Base" />
        <meta
          name="twitter:description"
          content="A living learning journal across Computer Science, Coding, Mathematics, Physics, and Chess."
        />
      </Helmet>

      {/* ─── Hero ─── */}
      <section
        style={{
          minHeight: 'calc(100vh - 56px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          position: 'relative',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.7rem',
            color: 'var(--pulsar)',
            letterSpacing: '0.2em',
            marginBottom: '1.5rem',
          }}
        >
          KNOWLEDGE BASE v1.0 — ONLINE
          <span
            style={{ animation: 'blink 1s step-start infinite', color: 'var(--pulsar)' }}
          >
            ▌
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            lineHeight: 1,
            margin: '0 0 0.5rem',
          }}
        >
          <span
            style={{
              color: 'var(--starlight)',
              display: 'block',
            }}
          >
            SINGULARITY
          </span>
          <span
            style={{
              color: 'var(--pulsar)',
              display: 'block',
              textShadow:
                '0 0 20px rgba(0,180,216,0.8), 0 0 50px rgba(0,180,216,0.4), 0 0 100px rgba(0,180,216,0.2)',
            }}
          >
            LAB
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: 'var(--comet)',
            maxWidth: 560,
            lineHeight: 1.7,
            margin: '1.5rem 0 2.5rem',
          }}
        >
          A living document of curiosity. Every equation learned, every algorithm understood, every move calculated.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem',
              color: 'var(--asteroid)',
              letterSpacing: '0.15em',
            }}
          >
            BEGIN EXPLORATION ↓
          </motion.div>
        </motion.div>

        <style>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
      </section>

      {/* ─── Discipline Grid ─── */}
      <section style={{ padding: '4rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
        {/* Section heading */}
        <div style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '1rem',
              color: 'var(--starlight)',
              letterSpacing: '0.15em',
              margin: '0 0 0.4rem',
            }}
          >
            // KNOWLEDGE DOMAINS
          </h2>
          <span
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.65rem',
              color: 'var(--asteroid)',
              letterSpacing: '0.1em',
            }}
          >
            05 SECTORS ACTIVE
          </span>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {curriculum.map((section, i) => (
            <DisciplineCard key={section.id} section={section} index={i} />
          ))}
        </div>
      </section>

      <CosmicDivider />

      {/* ─── Recent Entries ─── */}
      <section style={{ padding: '2rem 2rem 3rem', maxWidth: 1100, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1rem',
            color: 'var(--starlight)',
            letterSpacing: '0.15em',
            margin: '0 0 1.5rem',
          }}
        >
          // LATEST TRANSMISSIONS
        </h2>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
          }}
        >
          {recent.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              onClick={() => navigate(`/section/${entry.sectionId}/${entry.slug}`)}
              style={{
                minWidth: 220,
                padding: '1rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'border-color 0.2s',
              }}
              onHoverStart={() => {}}
              whileHover={{ borderColor: 'var(--border-glow)' } as Parameters<typeof motion.div>[0]['whileHover']}
            >
              <SectionBadge discipline={entry.sectionId as Discipline} size="sm" />
              <div
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.72rem',
                  color: 'var(--starlight)',
                  marginTop: '0.6rem',
                  marginBottom: '0.3rem',
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                {entry.title}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.58rem',
                  color: 'var(--asteroid)',
                }}
              >
                <span>{entry.date}</span>
                <span>{entry.readTime}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Stats Row ─── */}
      <section
        style={{
          padding: '2rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
        }}
      >
        {[
          { label: 'TOTAL ENTRIES', value: String(stats.totalEntries).padStart(2, '0') },
          { label: 'DISCIPLINES', value: '05' },
          { label: 'TOPICS', value: String(stats.topics).padStart(2, '0') },
          { label: 'PROBLEMS SOLVED', value: String(stats.problemsSolved).padStart(2, '0') },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '1.8rem',
                color: 'var(--pulsar)',
                fontWeight: 700,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.6rem',
                color: 'var(--asteroid)',
                letterSpacing: '0.1em',
                marginTop: '0.25rem',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </section>
    </Layout>
  )
}
