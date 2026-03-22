import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import OrbitLoader from './components/ui/OrbitLoader'

const Home = lazy(() => import('./pages/Home'))
const Section = lazy(() => import('./pages/Section'))
const Entry = lazy(() => import('./pages/Entry'))
const Search = lazy(() => import('./pages/Search'))

// Wrap only the page-specific content (not the chrome/layout) with transitions.
// opacity-less transitions prevent the blank screen caused by Strict Mode double-mount.
export const pageMotion = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

function ScrollToTopOnRouteChange() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return null
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        // Use style instead of initial-animate to guarantee visibility
        style={{ minHeight: '100vh' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/section/:disciplineId" element={<Section />} />
          <Route path="/section/:disciplineId/:slug" element={<Entry />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="*"
            element={
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100vh',
                  fontFamily: '"Space Mono", monospace',
                  color: 'var(--asteroid)',
                  gap: '1rem',
                }}
              >
                <div style={{ fontSize: '3rem', color: 'var(--nova)' }}>404</div>
                <div>SECTOR NOT FOUND</div>
                <Link
                  to="/"
                  style={{
                    color: 'var(--pulsar)',
                    textDecoration: 'none',
                    fontSize: '0.75rem',
                    border: '1px solid var(--border)',
                    padding: '0.5rem 1rem',
                    borderRadius: 6,
                  }}
                >
                  ← RETURN TO BASE
                </Link>
              </div>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTopOnRouteChange />
        <Suspense fallback={<OrbitLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}
