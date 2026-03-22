const DEFAULT_SITE_URL = 'https://singularitylab.example.com'

export function getSiteUrl(): string {
  const configured = import.meta.env.VITE_SITE_URL?.trim()
  const candidate = configured && configured.length > 0 ? configured : DEFAULT_SITE_URL

  try {
    return new URL(candidate).origin
  } catch {
    return DEFAULT_SITE_URL
  }
}

export function absoluteUrl(pathname = '/'): string {
  const base = getSiteUrl()
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return new URL(normalizedPath, base).toString()
}
