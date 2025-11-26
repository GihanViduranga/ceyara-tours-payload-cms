'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import logoImage from '../assest/images/Ceyara Tours Logo.png'
import { useLanguage } from '../contexts/LanguageContext'

interface SubmenuItem {
  subItem: string
  subHref: string
}

interface NavigationItem {
  parentMenu: string
  submenu: SubmenuItem[]
}

export default function Navigation() {
  const { language, setLanguage, languages, t, td } = useLanguage()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null)
  const [submenuMap, setSubmenuMap] = useState<Record<string, SubmenuItem[]>>({})

  const whatsappNumber = '+94772465884'

  // Main menu items with translations
  const mainMenuItems = [
    { name: t('nav.tailorMadeTours'), href: '/tailor-made-tours' },
    { name: t('nav.itineraries'), href: '/itineraries' },
    { name: t('nav.dayTours'), href: '/day-tours' },
    { name: t('nav.accommodation'), href: '/accommodation' },
    { name: t('nav.discoverSriLanka'), href: '/discover-sri-lanka' },
    { name: t('nav.ourStory'), href: '/our-story' },
    { name: t('nav.maldives'), href: '/maldives' },
    { name: t('nav.blog'), href: '/blog' },
  ]

  // Check if a menu item has submenus
  const hasSubmenus = (href: string) => {
    const key = href.replace('/', '')
    return submenuMap[key] && submenuMap[key].length > 0
  }

  useEffect(() => {
    const fetchSubmenus = async () => {
      try {
        const response = await fetch('/api/navigation?where[parentMenu][exists]=true')
        if (response.ok) {
          const result = await response.json()
          const data = result.docs || []

          // Create a map of parent menu to submenus
          const submenuMapData: Record<string, SubmenuItem[]> = {}
          data.forEach((item: NavigationItem) => {
            if (item.parentMenu && item.submenu) {
              submenuMapData[item.parentMenu] = item.submenu
            }
          })
          setSubmenuMap(submenuMapData)
        }
      } catch (error) {
        console.error('Failed to fetch submenus:', error)
      }
    }
    fetchSubmenus()
  }, [])

  // No external translation calls; dynamic strings are translated via td() at render-time

  const handleMouseEnter = (name: string) => {
    setActiveDropdown(name)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  const handleMobileSubmenuToggle = (itemName: string) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === itemName ? null : itemName)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false)
    setMobileSubmenuOpen(null)
  }

  const handleMobileLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
    // Close mobile menu after language selection on mobile size
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      handleMobileMenuClose()
    }
  }

  return (
    <nav className="navigation">
      {/* Main Navigation */}
      <div className="nav-main">
        <div className="container">
          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Logo Section with Language and Contact */}
          <div className="nav-logo-section">
            <div className="logo-left">
              <div className="language-selector">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="lang-select"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Link href="/" className="nav-logo">
              <div className="logo-container">
                <Image
                  src={logoImage}
                  alt="Ceyara Tours Logo"
                  width={100}
                  height={100}
                  className="logo-image"
                />
              </div>
            </Link>

            <div className="logo-right">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                className="whatsapp-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="phone-icon">📞</span> {whatsappNumber}
              </a>
              <Link href="/enquiry" className="enquiry-button">
                {t('nav.enquireNow')}
              </Link>
            </div>
          </div>

          {/* Menu Items */}
          <div className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {/* Mobile Menu Header */}
            <div className="mobile-menu-header">
              <div className="mobile-language-selector">
                <select
                  value={language}
                  onChange={handleMobileLanguageChange}
                  className="mobile-lang-select"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                className="mobile-whatsapp-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMobileMenuClose}
              >
                <span className="phone-icon">📞</span> {whatsappNumber}
              </a>
              <Link
                href="/enquiry"
                className="mobile-enquiry-button"
                onClick={handleMobileMenuClose}
              >
                {t('nav.enquireNow')}
              </Link>
            </div>

            {mainMenuItems.map((item) => {
              const hasSubmenu = hasSubmenus(item.href)
              return (
                <div
                  key={item.name}
                  className="nav-item"
                  onMouseEnter={() => !mobileMenuOpen && hasSubmenu && handleMouseEnter(item.name)}
                  onMouseLeave={() => !mobileMenuOpen && handleMouseLeave()}
                >
                  <div className="nav-link-wrapper">
                    <Link href={item.href} className="nav-link" onClick={handleMobileMenuClose}>
                      {item.name}
                    </Link>
                    {hasSubmenu && (
                      <button
                        className="mobile-submenu-toggle"
                        onClick={() => handleMobileSubmenuToggle(item.name)}
                      >
                        <span
                          className={`dropdown-arrow ${mobileSubmenuOpen === item.name ? 'open' : ''}`}
                        >
                          ▼
                        </span>
                      </button>
                    )}
                  </div>
                  {hasSubmenu && (
                    <div
                      className={`submenu ${
                        (
                          mobileMenuOpen
                            ? mobileSubmenuOpen === item.name
                            : activeDropdown === item.name
                        )
                          ? 'active'
                          : ''
                      }`}
                    >
                      {submenuMap[item.href.replace('/', '')]?.map(
                        (subMenuItem: SubmenuItem, index: number) => {
                          // Default routing for Discover Sri Lanka submenu items
                          let href = subMenuItem.subHref || '#'
                          const parentKey = item.href.replace('/', '')

                          // Fix Discover Sri Lanka submenu routes
                          if (parentKey === 'discover-sri-lanka') {
                            const subItemLower = subMenuItem.subItem.toLowerCase()
                            const hrefLower = href.toLowerCase()

                            // Check if href points to wrong location (like /Destinations or /Experiences)
                            if (
                              href === '/Destinations' ||
                              href === '/destinations' ||
                              hrefLower === '/destinations'
                            ) {
                              href = '/discover-sri-lanka/destinations'
                            } else if (
                              href === '/Experiences' ||
                              href === '/experiences' ||
                              hrefLower === '/experiences'
                            ) {
                              href = '/discover-sri-lanka/experiences'
                            }
                            // If subHref is empty or '#', try to generate default routes from subItem text
                            else if (!href || href === '#') {
                              if (subItemLower.includes('destination')) {
                                href = '/discover-sri-lanka/destinations'
                              } else if (subItemLower.includes('experience')) {
                                href = '/discover-sri-lanka/experiences'
                              }
                            }
                            // If href doesn't contain 'discover-sri-lanka', fix it
                            else if (
                              !href.includes('discover-sri-lanka') &&
                              !href.startsWith('http')
                            ) {
                              if (
                                subItemLower.includes('destination') ||
                                hrefLower.includes('destination')
                              ) {
                                href = '/discover-sri-lanka/destinations'
                              } else if (
                                subItemLower.includes('experience') ||
                                hrefLower.includes('experience')
                              ) {
                                href = '/discover-sri-lanka/experiences'
                              }
                            }
                          }

                          // Ensure href starts with '/' if it's a relative path
                          if (
                            href &&
                            href !== '#' &&
                            !href.startsWith('/') &&
                            !href.startsWith('http')
                          ) {
                            href = '/' + href
                          }

                          return (
                            <Link
                              key={index}
                              href={href}
                              className="submenu-link"
                              onClick={handleMobileMenuClose}
                            >
                              {td(subMenuItem.subItem)}
                            </Link>
                          )
                        },
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
