import { useState } from 'react'
import type { MouseEvent } from 'react'

interface Props {
  scrollY: number
}

const navLinks = [
  { label: 'Sistema', href: '#sistema' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Garantía', href: '#garantia' },
  { label: 'Contacto', href: '#contacto' },
]

const scrollToHash = (href: string) => {
  const id = href.slice(1)
  if (!id) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Nav({ scrollY }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const elevated = scrollY > 48

  const handleAnchorClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setMenuOpen(false)
    scrollToHash(href)
  }

  return (
    <>
      <nav className={elevated ? 'ao-nav ao-nav-elevated' : 'ao-nav'} aria-label="Principal">
        <a className="ao-nav-logo" href="#" onClick={handleAnchorClick('#')}>
          Andreescu Oakmont
        </a>

        <div className="ao-nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={handleAnchorClick(link.href)}>
              {link.label}
            </a>
          ))}
        </div>

        <a className="ao-nav-cta" href="#contacto" onClick={handleAnchorClick('#contacto')}>
          Reservar diagnóstico
        </a>

        <button
          className="ao-menu-button"
          type="button"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
        </button>
      </nav>

      {menuOpen && (
        <div className="ao-mobile-menu" role="dialog" aria-modal="true" aria-label="Menú principal">
          <div className="ao-mobile-menu-top">
            <span>Andreescu Oakmont</span>
            <button type="button" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)}>
              X
            </button>
          </div>

          <div className="ao-mobile-menu-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={handleAnchorClick(link.href)}>
                {link.label}
              </a>
            ))}
          </div>

          <a
            className="ao-mobile-menu-cta"
            href="#contacto"
            onClick={handleAnchorClick('#contacto')}
          >
            Reservar diagnóstico
          </a>
        </div>
      )}
    </>
  )
}
