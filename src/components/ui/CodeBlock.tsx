import React, { useState, useCallback, useMemo } from 'react'

interface Props {
  language: string
  content: string
}

const CodeBlock = React.memo(function CodeBlock({ language, content }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const el = document.createElement('textarea')
      el.value = content
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [content])

  const lines = useMemo(() => content.split('\n'), [content])

  return (
    <div
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        margin: '1.5rem 0',
        position: 'relative',
      }}
    >
      {/* Terminal header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0.75rem',
          background: 'rgba(5,5,8,0.95)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span
            style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }}
          />
          <span
            style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }}
          />
          <span
            style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }}
          />
          <span
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.65rem',
              color: 'var(--asteroid)',
              marginLeft: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {language}
          </span>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.08em',
            color: copied ? '#28c840' : 'var(--asteroid)',
            background: 'transparent',
            border: `1px solid ${copied ? '#28c840' : 'var(--border)'}`,
            borderRadius: '4px',
            padding: '0.2rem 0.5rem',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>

      {/* Code area */}
      <div
        style={{
          background: 'var(--void)',
          overflowX: 'auto',
          position: 'relative',
        }}
      >
        {/* Scanline overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <table style={{ width: '100%', borderCollapse: 'collapse', position: 'relative', zIndex: 2 }}>
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} style={{ lineHeight: 1.6 }}>
                {/* Line number */}
                <td
                  style={{
                    padding: '0 0.75rem',
                    width: '2.5rem',
                    textAlign: 'right',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.72rem',
                    color: 'var(--asteroid)',
                    userSelect: 'none',
                    borderRight: '1px solid var(--border)',
                    opacity: 0.5,
                    verticalAlign: 'top',
                    paddingTop: i === 0 ? '0.75rem' : 0,
                    paddingBottom: i === lines.length - 1 ? '0.75rem' : 0,
                  }}
                >
                  {i + 1}
                </td>
                {/* Code content */}
                <td
                  style={{
                    padding: i === 0
                      ? '0.75rem 1rem 0 1rem'
                      : i === lines.length - 1
                      ? '0 1rem 0.75rem 1rem'
                      : '0 1rem',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.8rem',
                    color: 'var(--pulsar)',
                    whiteSpace: 'pre',
                    verticalAlign: 'top',
                  }}
                >
                  {line || '\u00A0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})

export default CodeBlock
