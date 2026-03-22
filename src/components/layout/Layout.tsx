import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import StarfieldCanvas from '../ui/StarfieldCanvas'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import MobileMenu from './MobileMenu'
import SearchModal from '../ui/SearchModal'

interface Props {
  children: ReactNode
  showProgress?: boolean
}

export default function Layout({ children }: Props) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const openSearch = useCallback(() => setSearchOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  const openMenu = useCallback(() => setMenuOpen(true), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <StarfieldCanvas />

      <TopBar onSearchOpen={openSearch} onMenuOpen={openMenu} />

      {/* Desktop sidebar */}
      <div className="desktop-sidebar">
        <Sidebar onSearchOpen={openSearch} />
      </div>

      {/* Mobile menu */}
      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        onSearchOpen={openSearch}
      />

      {/* Search modal */}
      <SearchModal open={searchOpen} onClose={closeSearch} />

      {/* Main content area */}
      <main
        style={{
          paddingTop: 56, // TopBar height
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
        }}
        className="layout-main"
      >
        {children}
      </main>

      <style>{`
        .desktop-sidebar {
          display: block;
        }
        .layout-main {
          margin-left: 260px;
        }
        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none;
          }
          .layout-main {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </>
  )
}
