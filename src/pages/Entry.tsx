import { useMemo, useState, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '../components/layout/Layout'
import ProgressBar from '../components/ui/ProgressBar'
import Breadcrumb from '../components/ui/Breadcrumb'
import TableOfContents from '../components/ui/TableOfContents'
import CodeBlock from '../components/ui/CodeBlock'
import CosmicDivider from '../components/ui/CosmicDivider'
import SectionBadge from '../components/ui/SectionBadge'
import { curriculum, getEntryBySlug } from '../data/curriculum'
import type { ContentBlock, Discipline, Entry as EntryType } from '../types'
import { slugifyHeading } from '../components/ui/TableOfContents'
import { absoluteUrl } from '../utils/seo'

const DISCIPLINE_COLORS: Record<Discipline, string> = {
  'computer-science': '#00b4d8',
  coding: '#7b2fff',
  mathematics: '#00d4aa',
  physics: '#f72585',
  chess: '#f0c040',
}

const DIFFICULTY_STYLES = {
  beginner: { color: '#00d4aa', bg: 'rgba(0,212,170,0.1)', border: 'rgba(0,212,170,0.3)' },
  intermediate: { color: '#f0c040', bg: 'rgba(240,192,64,0.1)', border: 'rgba(240,192,64,0.3)' },
  advanced: { color: '#f72585', bg: 'rgba(247,37,133,0.1)', border: 'rgba(247,37,133,0.3)' },
}

const CALLOUT_STYLES = {
  info: { color: '#00b4d8', bg: 'rgba(0,180,216,0.08)', icon: 'ℹ', label: 'INFO' },
  warning: { color: '#f0a500', bg: 'rgba(240,165,0,0.08)', icon: '⚠', label: 'WARNING' },
  tip: { color: '#00d4aa', bg: 'rgba(0,212,170,0.08)', icon: '✦', label: 'TIP' },
  insight: { color: '#7b2fff', bg: 'rgba(123,47,255,0.08)', icon: '◈', label: 'INSIGHT' },
}

function SolutionBlock({ block }: { block: ContentBlock }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        border: '1px solid rgba(123,47,255,0.4)',
        borderRadius: 8,
        margin: '1.25rem 0',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          background: 'rgba(123,47,255,0.08)',
          border: 'none',
          cursor: 'pointer',
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.7rem',
          color: '#7b2fff',
          letterSpacing: '0.1em',
          textAlign: 'left',
        }}
      >
        <span>{open ? '▾' : '▸'}</span>
        <span>{open ? 'HIDE SOLUTION' : 'REVEAL SOLUTION'}</span>
        {block.label && (
          <span style={{ color: 'var(--asteroid)', marginLeft: 'auto' }}>
            {block.label}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <pre
              style={{
                margin: 0,
                padding: '1rem',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.78rem',
                color: 'var(--starlight)',
                lineHeight: 1.7,
                background: 'var(--surface-alt)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {block.content}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function renderBlock(block: ContentBlock, color: string, index: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p
          key={index}
          style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 300,
            color: 'var(--comet)',
            lineHeight: 1.9,
            maxWidth: 700,
            marginBottom: '1.25rem',
            fontSize: '0.95rem',
          }}
        >
          {block.content}
        </p>
      )

    case 'heading': {
      const id = slugifyHeading(block.content ?? '')
      return (
        <h2
          key={index}
          id={id}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 600,
            color: 'var(--starlight)',
            fontSize: '1.2rem',
            marginTop: '2.5rem',
            marginBottom: '1rem',
            paddingLeft: '1rem',
            borderLeft: `2px solid ${color}`,
            scrollMarginTop: '5rem',
          }}
        >
          {block.content}
        </h2>
      )
    }

    case 'subheading': {
      const id = slugifyHeading(block.content ?? '')
      return (
        <h3
          key={index}
          id={id}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 400,
            color: 'var(--pulsar)',
            fontSize: '0.95rem',
            marginTop: '1.75rem',
            marginBottom: '0.75rem',
            scrollMarginTop: '5rem',
          }}
        >
          {block.content}
        </h3>
      )
    }

    case 'code':
      return (
        <CodeBlock
          key={index}
          language={block.language ?? 'text'}
          content={block.content ?? ''}
        />
      )

    case 'math':
      return (
        <div
          key={index}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.82rem',
            color: 'var(--starlight)',
            background: 'var(--surface-alt)',
            borderLeft: '3px solid var(--quasar)',
            padding: '1rem 1.25rem',
            margin: '1.25rem 0',
            borderRadius: '0 6px 6px 0',
            overflowX: 'auto',
            whiteSpace: 'pre',
            lineHeight: 1.8,
          }}
        >
          {block.content}
        </div>
      )

    case 'image':
      return (
        <figure key={index} style={{ margin: '1.5rem 0' }}>
          <img
            src={block.content}
            alt={block.alt ?? ''}
            loading="lazy"
            width={1200}
            height={500}
            style={{
              width: '100%',
              maxWidth: 700,
              height: 'auto',
              borderRadius: 8,
              border: '1px solid var(--border-glow)',
              display: 'block',
            }}
          />
          {block.caption && (
            <figcaption
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.65rem',
                color: 'var(--asteroid)',
                marginTop: '0.5rem',
              }}
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'quote':
      return (
        <blockquote
          key={index}
          style={{
            margin: '1.5rem 0',
            padding: '1rem 1.5rem',
            borderLeft: `3px solid var(--pulsar)`,
            fontFamily: 'Sora, sans-serif',
            fontStyle: 'italic',
            color: 'var(--starlight)',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            background: 'rgba(0,180,216,0.04)',
            borderRadius: '0 6px 6px 0',
          }}
        >
          {block.content}
        </blockquote>
      )

    case 'callout': {
      const cfg = CALLOUT_STYLES[block.calloutType ?? 'info']
      return (
        <div
          key={index}
          style={{
            display: 'flex',
            gap: '0.75rem',
            padding: '0.875rem 1rem',
            background: cfg.bg,
            border: `1px solid ${cfg.color}50`,
            borderRadius: 8,
            margin: '1.25rem 0',
          }}
        >
          <span style={{ fontSize: '0.9rem', flexShrink: 0, paddingTop: 2 }}>{cfg.icon}</span>
          <div>
            <div
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.6rem',
                color: cfg.color,
                letterSpacing: '0.1em',
                marginBottom: '0.3rem',
              }}
            >
              {cfg.label}
            </div>
            <p
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '0.85rem',
                color: 'var(--comet)',
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              {block.content}
            </p>
          </div>
        </div>
      )
    }

    case 'list':
      return (
        <ul
          key={index}
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '1rem 0',
          }}
        >
          {block.items?.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: '0.5rem',
                fontFamily: 'Sora, sans-serif',
                fontSize: '0.9rem',
                color: 'var(--comet)',
                lineHeight: 1.7,
                marginBottom: '0.4rem',
                paddingLeft: '0.25rem',
              }}
            >
              <span style={{ color, flexShrink: 0, marginTop: '0.1rem' }}>▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'numbered-list':
      return (
        <ol
          key={index}
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '1rem 0',
            counterReset: 'item',
          }}
        >
          {block.items?.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: '0.75rem',
                fontFamily: 'Sora, sans-serif',
                fontSize: '0.9rem',
                color: 'var(--comet)',
                lineHeight: 1.7,
                marginBottom: '0.4rem',
              }}
            >
              <span
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.7rem',
                  color,
                  flexShrink: 0,
                  minWidth: '1.5rem',
                  marginTop: '0.15rem',
                }}
              >
                {String(i + 1).padStart(2, '0')}.
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )

    case 'table':
      return (
        <div
          key={index}
          style={{ overflowX: 'auto', margin: '1.5rem 0' }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.72rem',
            }}
          >
            {block.headers && (
              <thead>
                <tr>
                  {block.headers.map((h, i) => (
                    <th
                      key={i}
                      style={{
                        padding: '0.6rem 0.875rem',
                        textAlign: 'left',
                        color,
                        borderBottom: `1px solid ${color}50`,
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows?.map((row, ri) => (
                <tr
                  key={ri}
                  style={{
                    background: ri % 2 === 0 ? 'var(--surface)' : 'var(--surface-alt)',
                  }}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: '0.5rem 0.875rem',
                        color: ci === 0 ? 'var(--starlight)' : 'var(--comet)',
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'divider':
      return <CosmicDivider key={index} color={color} />

    case 'problem':
      return (
        <div
          key={index}
          style={{
            background: 'var(--surface-alt)',
            border: '1px solid rgba(247,37,133,0.4)',
            borderRadius: 8,
            padding: '1rem 1.25rem',
            margin: '1.25rem 0',
          }}
        >
          <div
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem',
              color: 'var(--nova)',
              letterSpacing: '0.12em',
              marginBottom: '0.5rem',
            }}
          >
            {block.label ?? 'PROBLEM'}
          </div>
          <p
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '0.9rem',
              color: 'var(--comet)',
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            {block.content}
          </p>
        </div>
      )

    case 'solution':
      return <SolutionBlock key={index} block={block} />

    default:
      return null
  }
}

export default function Entry() {
  const { disciplineId, slug } = useParams<{ disciplineId: string; slug: string }>()
  const navigate = useNavigate()

  const entry = useMemo(() => getEntryBySlug(slug ?? ''), [slug])
  const section = useMemo(
    () => curriculum.find(s => s.id === disciplineId),
    [disciplineId]
  )

  const { prevEntry, nextEntry } = useMemo(() => {
    if (!entry || !section) return { prevEntry: null, nextEntry: null }
    const topic = section.topics.find(t => t.id === entry.topicId)
    if (!topic) return { prevEntry: null, nextEntry: null }
    const idx = topic.entries.findIndex(e => e.id === entry.id)
    return {
      prevEntry: idx > 0 ? topic.entries[idx - 1] : null,
      nextEntry: idx < topic.entries.length - 1 ? topic.entries[idx + 1] : null,
    }
  }, [entry, section])

  const prerequisites = useMemo<EntryType[]>(() => {
    if (!entry?.prerequisites) return []
    return entry.prerequisites
      .map(slug => curriculum.flatMap(s => s.topics.flatMap(t => t.entries)).find(e => e.slug === slug))
      .filter((e): e is EntryType => Boolean(e))
  }, [entry])

  const navToEntry = useCallback(
    (e: EntryType) => navigate(`/section/${e.sectionId}/${e.slug}`),
    [navigate]
  )

  if (!entry || !section) {
    return (
      <Layout>
        <div style={{ padding: '4rem 2rem', textAlign: 'center', fontFamily: '"Space Mono", monospace', color: 'var(--asteroid)' }}>
          ENTRY NOT FOUND
        </div>
      </Layout>
    )
  }

  const color = DISCIPLINE_COLORS[section.discipline]
  const diff = DIFFICULTY_STYLES[entry.difficulty]
  const entryImage = entry.content.find(b => b.type === 'image')?.content
  const canonical = absoluteUrl(`/section/${entry.sectionId}/${entry.slug}`)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    description: entry.subtitle,
    keywords: entry.tags,
    datePublished: entry.date,
    dateModified: entry.date,
    mainEntityOfPage: canonical,
    author: {
      '@type': 'Organization',
      name: 'SingularityLab',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SingularityLab',
    },
    image: entryImage ? absoluteUrl(entryImage) : undefined,
  }

  return (
    <Layout showProgress>
      <ProgressBar />

      <Helmet>
        <title>SingularityLab | {entry.title}</title>
        <meta name="description" content={entry.subtitle} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={`SingularityLab | ${entry.title}`} />
        <meta property="og:description" content={entry.subtitle} />
        {entryImage && <meta property="og:image" content={absoluteUrl(entryImage)} />}
        <meta property="og:site_name" content="SingularityLab" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`SingularityLab | ${entry.title}`} />
        <meta name="twitter:description" content={entry.subtitle} />
        <meta name="keywords" content={entry.tags.join(', ')} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '2rem 1.5rem 4rem',
          display: 'grid',
          gridTemplateColumns: '1fr 280px',
          gridTemplateAreas: '"content sidebar"',
          gap: '2.5rem',
          alignItems: 'start',
        }}
        className="entry-layout"
      >
        {/* ─── Left: Content ─── */}
        <div style={{ gridArea: 'content', minWidth: 0 }}>
          <Breadcrumb
            items={[
              { label: 'SingularityLab', href: '/' },
              { label: section.title, href: `/section/${section.id}` },
              { label: entry.title },
            ]}
          />

          {/* Entry header */}
          <div
            style={{
              borderLeft: `3px solid ${color}`,
              paddingLeft: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            <h1
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1.3rem, 3vw, 2rem)',
                color: 'var(--starlight)',
                margin: '0 0 0.6rem',
                lineHeight: 1.2,
              }}
            >
              {entry.title}
            </h1>
            <p
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '1rem',
                color: 'var(--comet)',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {entry.subtitle}
            </p>
          </div>

          {/* Content blocks */}
          <div>
            {entry.content.map((block, i) => renderBlock(block, color, i))}
          </div>

          {/* Footer nav */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              marginTop: '3rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border)',
              flexWrap: 'wrap',
            }}
          >
            <div>
              {prevEntry && (
                <button
                  onClick={() => navToEntry(prevEntry)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    padding: '0.5rem 0.875rem',
                    cursor: 'pointer',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.65rem',
                    color: 'var(--comet)',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ color: 'var(--asteroid)', marginBottom: '0.2rem' }}>← PREV</div>
                  <div>{prevEntry.title}</div>
                </button>
              )}
            </div>
            <div>
              {nextEntry && (
                <button
                  onClick={() => navToEntry(nextEntry)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    padding: '0.5rem 0.875rem',
                    cursor: 'pointer',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.65rem',
                    color: 'var(--comet)',
                    textAlign: 'right',
                  }}
                >
                  <div style={{ color: 'var(--asteroid)', marginBottom: '0.2rem' }}>NEXT →</div>
                  <div>{nextEntry.title}</div>
                </button>
              )}
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <Link
              to={`/section/${section.id}`}
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.65rem',
                color: 'var(--asteroid)',
                textDecoration: 'none',
              }}
            >
              ← Back to {section.title}
            </Link>
          </div>
        </div>

        {/* ─── Right: Sidebar ─── */}
        <aside style={{ gridArea: 'sidebar' }}>
          {/* Metadata panel */}
          <div
            style={{
              background: 'var(--nebula)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '1rem',
              marginBottom: '1.25rem',
            }}
          >
            {/* Badges */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.875rem' }}>
              <SectionBadge discipline={section.discipline} size="sm" />
              <span
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.6rem',
                  color: diff.color,
                  background: diff.bg,
                  border: `1px solid ${diff.border}`,
                  borderRadius: 9999,
                  padding: '0.15rem 0.5rem',
                }}
              >
                {entry.difficulty}
              </span>
            </div>

            {/* Meta rows */}
            {[
              { label: 'LOGGED', value: entry.date },
              { label: 'READ TIME', value: entry.readTime },
            ].map(row => (
              <div
                key={row.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.62rem',
                  marginBottom: '0.4rem',
                }}
              >
                <span style={{ color: 'var(--asteroid)' }}>{row.label}</span>
                <span style={{ color: 'var(--comet)' }}>{row.value}</span>
              </div>
            ))}

            {/* Tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.3rem',
                marginTop: '0.875rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border)',
              }}
            >
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

            {/* Prerequisites */}
            {prerequisites.length > 0 && (
              <div style={{ marginTop: '0.875rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                <div
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.58rem',
                    color: 'var(--asteroid)',
                    letterSpacing: '0.08em',
                    marginBottom: '0.4rem',
                  }}
                >
                  PREREQUISITES
                </div>
                {prerequisites.map(pre => (
                  <Link
                    key={pre.id}
                    to={`/section/${pre.sectionId}/${pre.slug}`}
                    style={{
                      display: 'block',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.6rem',
                      color: 'var(--pulsar)',
                      textDecoration: 'none',
                      marginBottom: '0.2rem',
                    }}
                  >
                    ↗ {pre.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Table of Contents */}
          <TableOfContents blocks={entry.content} />
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .entry-layout {
            grid-template-columns: 1fr !important;
            grid-template-areas: "sidebar" "content" !important;
          }
        }
      `}</style>
    </Layout>
  )
}
