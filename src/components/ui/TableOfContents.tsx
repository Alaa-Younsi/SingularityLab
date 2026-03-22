import { useEffect, useState, useMemo, useCallback } from 'react'
import type { ContentBlock } from '../../types'

interface Props {
  blocks: ContentBlock[]
}

interface TocItem {
  id: string
  text: string
  level: 'heading' | 'subheading'
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

export default function TableOfContents({ blocks }: Props) {
  const [activeId, setActiveId] = useState<string>('')

  const tocItems = useMemo<TocItem[]>(() => {
    return blocks
      .filter(b => b.type === 'heading' || b.type === 'subheading')
      .map(b => ({
        id: slugifyHeading(b.content ?? ''),
        text: b.content ?? '',
        level: b.type as 'heading' | 'subheading',
      }))
  }, [blocks])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-10% 0% -70% 0%', threshold: 0 }
    )

    tocItems.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [tocItems])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  if (tocItems.length === 0) return null

  return (
    <div
      style={{
        position: 'sticky',
        top: '5rem',
        padding: '1rem',
        background: 'var(--nebula)',
        border: '1px solid var(--border)',
        borderRadius: 8,
      }}
    >
      {/* Header */}
      <div
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.62rem',
          color: 'var(--asteroid)',
          letterSpacing: '0.12em',
          marginBottom: '0.875rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        IN THIS ENTRY
      </div>

      {/* TOC items */}
      <nav>
        {tocItems.map(item => {
          const isActive = activeId === item.id
          const isSubheading = item.level === 'subheading'
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                borderLeft: isActive ? '2px solid var(--pulsar)' : '2px solid transparent',
                padding: `0.3rem 0.6rem ${0}rem ${isSubheading ? '1.2rem' : '0.6rem'}`,
                marginBottom: '0.125rem',
                fontFamily: '"Space Mono", monospace',
                fontSize: isSubheading ? '0.63rem' : '0.67rem',
                color: isActive ? 'var(--pulsar)' : 'var(--asteroid)',
                cursor: 'pointer',
                transition: 'color 0.15s, border-left-color 0.15s',
                lineHeight: 1.4,
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  const el = e.currentTarget
                  el.style.color = 'var(--comet)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  const el = e.currentTarget
                  el.style.color = 'var(--asteroid)'
                }
              }}
            >
              {item.text}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export { slugifyHeading }
