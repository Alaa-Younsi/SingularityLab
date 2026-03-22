import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import CosmicDivider from '../components/ui/CosmicDivider'
import SectionBadge from '../components/ui/SectionBadge'
import { getSectionById } from '../data/curriculum'
import type { Discipline } from '../types'
import { absoluteUrl } from '../utils/seo'

const DIFFICULTY_STYLES = {
  beginner: { color: '#00d4aa', bg: 'rgba(0,212,170,0.1)', border: 'rgba(0,212,170,0.3)' },
  intermediate: { color: '#f0c040', bg: 'rgba(240,192,64,0.1)', border: 'rgba(240,192,64,0.3)' },
  advanced: { color: '#f72585', bg: 'rgba(247,37,133,0.1)', border: 'rgba(247,37,133,0.3)' },
}

const DISCIPLINE_COLORS: Record<Discipline, string> = {
  'computer-science': '#00b4d8',
  coding: '#7b2fff',
  mathematics: '#00d4aa',
  physics: '#f72585',
  chess: '#f0c040',
}

export default function Section() {
  const { disciplineId } = useParams<{ disciplineId: string }>()
  const navigate = useNavigate()

  const section = useMemo(
    () => getSectionById(disciplineId ?? ''),
    [disciplineId]
  )

  if (!section) {
    return (
      <Layout>
        <div
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            fontFamily: '"Space Mono", monospace',
            color: 'var(--asteroid)',
          }}
        >
          SECTION NOT FOUND: {disciplineId}
        </div>
      </Layout>
    )
  }

  const color = DISCIPLINE_COLORS[section.discipline]
  const canonical = absoluteUrl(`/section/${section.id}`)

  return (
    <Layout>
      <Helmet>
        <title>SingularityLab | {section.title}</title>
        <meta name="description" content={section.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={`SingularityLab | ${section.title}`} />
        <meta property="og:description" content={section.description} />
        <meta property="og:site_name" content="SingularityLab" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`SingularityLab | ${section.title}`} />
        <meta name="twitter:description" content={section.description} />
      </Helmet>

      <div style={{ padding: '3rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              fontSize: '3.5rem',
              marginBottom: '0.75rem',
              filter: `drop-shadow(0 0 12px ${color}90)`,
              animation: 'float 4s ease-in-out infinite',
            }}
          >
            {section.icon}
          </div>

          <h1
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              fontSize: '2rem',
              color: 'var(--starlight)',
              margin: '0 0 0.75rem',
              letterSpacing: '0.05em',
            }}
          >
            {section.title}
          </h1>

          <p
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '1rem',
              color: 'var(--comet)',
              maxWidth: 600,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {section.description}
          </p>
        </motion.div>

        <CosmicDivider color={color} />

        {/* Topics */}
        {section.topics.map((topic, ti) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ti * 0.1, duration: 0.4 }}
            style={{ marginBottom: '2.5rem' }}
          >
            {/* Topic header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
                paddingBottom: '0.75rem',
                borderBottom: `1px solid ${color}30`,
              }}
            >
              <h2
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1rem',
                  color: 'var(--starlight)',
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                {topic.title}
              </h2>
              <span
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.6rem',
                  color: color,
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                  borderRadius: 9999,
                  padding: '0.15rem 0.5rem',
                }}
              >
                {topic.entries.length} entries
              </span>
            </div>

            {/* Entry cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem',
              }}
            >
              {topic.entries.map(entry => {
                const diff = DIFFICULTY_STYLES[entry.difficulty]
                return (
                  <motion.div
                    key={entry.id}
                    whileHover={{ borderColor: color, scale: 1.01 } as Parameters<typeof motion.div>[0]['whileHover']}
                    onClick={() =>
                      navigate(`/section/${section.id}/${entry.slug}`)
                    }
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      padding: '1.25rem',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s, transform 0.2s',
                    }}
                  >
                    {/* Header row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <SectionBadge discipline={section.discipline} size="sm" />
                      <span
                        style={{
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.58rem',
                          color: diff.color,
                          background: diff.bg,
                          border: `1px solid ${diff.border}`,
                          borderRadius: 9999,
                          padding: '0.1rem 0.4rem',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {entry.difficulty}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--starlight)',
                        margin: '0 0 0.4rem',
                      }}
                    >
                      {entry.title}
                    </h3>

                    {/* Subtitle */}
                    <p
                      style={{
                        fontFamily: 'Sora, sans-serif',
                        fontSize: '0.75rem',
                        color: 'var(--comet)',
                        margin: '0 0 0.75rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {entry.subtitle}
                    </p>

                    {/* Footer */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.58rem',
                        color: 'var(--asteroid)',
                      }}
                    >
                      <span>{entry.readTime}</span>
                      <span>{entry.date}</span>
                    </div>

                    {/* Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.3rem',
                        marginTop: '0.75rem',
                      }}
                    >
                      {entry.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: '"Space Mono", monospace',
                            fontSize: '0.55rem',
                            color: 'var(--asteroid)',
                            background: 'var(--surface-alt)',
                            border: '1px solid var(--border)',
                            borderRadius: 4,
                            padding: '0.1rem 0.35rem',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </Layout>
  )
}
