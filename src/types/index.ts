export type Discipline =
  | 'computer-science'
  | 'coding'
  | 'mathematics'
  | 'physics'
  | 'chess'

export interface Section {
  id: string
  discipline: Discipline
  title: string
  description: string
  icon: string
  color: string
  topics: Topic[]
}

export interface Topic {
  id: string
  sectionId: string
  title: string
  description: string
  entries: Entry[]
}

export interface Entry {
  id: string
  topicId: string
  sectionId: string
  slug: string
  title: string
  subtitle: string
  date: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  content: ContentBlock[]
  readTime: string
  prerequisites?: string[]
}

export interface ContentBlock {
  type:
    | 'paragraph'
    | 'heading'
    | 'subheading'
    | 'code'
    | 'math'
    | 'image'
    | 'quote'
    | 'callout'
    | 'list'
    | 'numbered-list'
    | 'table'
    | 'divider'
    | 'problem'
    | 'solution'
  content?: string
  language?: string
  items?: string[]
  calloutType?: 'info' | 'warning' | 'tip' | 'insight'
  headers?: string[]
  rows?: string[][]
  alt?: string
  caption?: string
  label?: string
}
