import { useMemo } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import SectionBadge from '../components/ui/SectionBadge'
import { curriculum } from '../data/curriculum'
import type { Discipline } from '../types'
import { absoluteUrl } from '../utils/seo'

export default function Search() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const navigate = useNavigate()
  const canonical = absoluteUrl('/search')

  const results = useMemo(() => {
    if (!q.trim()) return []
    const query = q.toLowerCase()
    return curriculum.flatMap(section =>
      section.topics.flatMap(topic =>
        topic.entries
          .filter(
            e =>
              e.title.toLowerCase().includes(query) ||
              e.subtitle.toLowerCase().includes(query) ||
              e.tags.some(t => t.toLowerCase().includes(query)) ||
              e.content.some(
                b =>
                  b.type === 'paragraph' &&
                  b.content?.toLowerCase().includes(query)
              )
          )
          .map(entry => ({
            entry,
            section,
            excerpt:
              (
                entry.content.find(b => b.type === 'paragraph')?.content ?? entry.subtitle
              ).slice(0, 160) + '…',
          }))
      )
    )
  }, [q])

  // Group by discipline
  const grouped = useMemo(() => {
    const map = new Map<string, typeof results>()
    results.forEach(r => {
      const key = r.section.id
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(r)
    })
    return map
  }, [results])

  return (
    <Layout>
      <Helmet>
        <title>SingularityLab | Search{q ? `: ${q}` : ''}</title>
        <meta name="description" content={`Search results for "${q}" in SingularityLab knowledge base`} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content="SingularityLab | Search" />
        <meta property="og:description" content="Search the SingularityLab knowledge base." />
        <meta property="og:site_name" content="SingularityLab" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SingularityLab | Search" />
        <meta name="twitter:description" content="Search the SingularityLab knowledge base." />
      </Helmet>

      <div style={{ padding: '2.5rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.65rem',
              color: 'var(--asteroid)',
              letterSpacing: '0.12em',
              marginBottom: '0.5rem',
            }}
          >
            // SEARCH RESULTS
          </div>
          <h1
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '1.4rem',
              color: 'var(--starlight)',
              margin: '0 0 0.5rem',
              fontWeight: 700,
            }}
          >
            {q ? `"${q}"` : 'All Entries'}
          </h1>
          <div
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.65rem',
              color: 'var(--asteroid)',
            }}
          >
            {results.length} RESULT{results.length !== 1 ? 'S' : ''} FOUND
          </div>
        </div>

        {/* No results */}
        {q && results.length === 0 && (
          <div
            style={{
              padding: '3rem',
              textAlign: 'center',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.75rem',
              color: 'var(--asteroid)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              background: 'var(--surface)',
            }}
          >
            NO ENTRIES MATCH "{q.toUpperCase()}".<br />
            <span style={{ marginTop: '0.5rem', display: 'inline-block' }}>
              Try a different search term.
            </span>
          </div>
        )}

        {/* Results grouped by discipline */}
        {Array.from(grouped.entries()).map(([sectionId, items]) => {
          const section = curriculum.find(s => s.id === sectionId)!
          return (
            <div key={sectionId} style={{ marginBottom: '2.5rem' }}>
              {/* Group header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{section.icon}</span>
                <span
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.8rem',
                    color: 'var(--starlight)',
                    fontWeight: 600,
                  }}
                >
                  {section.title}
                </span>
                <span
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.6rem',
                    color: 'var(--asteroid)',
                  }}
                >
                  {items.length} result{items.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Result cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {items.map(({ entry, excerpt }, i) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    onClick={() =>
                      navigate(`/section/${entry.sectionId}/${entry.slug}`)
                    }
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      padding: '1rem 1.25rem',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                    }}
                    whileHover={{ borderColor: 'var(--border-glow)' } as Parameters<typeof motion.div>[0]['whileHover']}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <SectionBadge discipline={section.discipline as Discipline} size="sm" />
                      <h3
                        style={{
                          fontFamily: 'Orbitron, sans-serif',
                          fontSize: '0.82rem',
                          color: 'var(--starlight)',
                          margin: 0,
                          fontWeight: 600,
                        }}
                      >
                        {entry.title}
                      </h3>
                    </div>

                    <p
                      style={{
                        fontFamily: 'Sora, sans-serif',
                        fontSize: '0.8rem',
                        color: 'var(--comet)',
                        margin: '0 0 0.75rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {excerpt}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {entry.tags.map(tag => (
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
                ))}
              </div>
            </div>
          )
        })}

        {/* Empty state (no query) */}
        {!q && (
          <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <div
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.75rem',
                color: 'var(--asteroid)',
                marginBottom: '1rem',
              }}
            >
              USE THE SEARCH BAR ABOVE OR PRESS ⌘K
            </div>
            <Link
              to="/"
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.65rem',
                color: 'var(--pulsar)',
                textDecoration: 'none',
              }}
            >
              ← Return to Home
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}
