'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguage } from '../../contexts/LanguageContext'
import '../styles.css'

interface TeamMember {
  name: string
  role: string
  image: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Dinesh',
    role: 'Founder / Managing Director',
    image: '/api/placeholder/300/400',
  },
  {
    name: 'Nimesha Madushani',
    role: 'Sales Manager',
    image: '/api/placeholder/300/400',
  },
  {
    name: 'Reshani',
    role: 'Sales Manager',
    image: '/api/placeholder/300/400',
  },
  {
    name: 'Nilusha',
    role: 'Accountant',
    image: '/api/placeholder/300/400',
  },
  {
    name: 'Amesha',
    role: 'Senior Executive Operations and Marketing',
    image: '/api/placeholder/300/400',
  },
  {
    name: 'Kavindi',
    role: 'Accounts Executive',
    image: '/api/placeholder/300/400',
  },
]

export default function OurTeamPage() {
  const { t } = useLanguage()

  return (
    <div className="our-team-page">
      <section className="our-team-hero">
        <div className="container">
          <h1 className="our-team-title">{t('ourTeam.title')}</h1>
          <div className="our-team-description">
            <p>{t('ourTeam.description1')}</p>
            <p>{t('ourTeam.description2')}</p>
          </div>
        </div>
      </section>

      <section className="our-team-grid-section">
        <div className="container">
          <div className="our-team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="our-team-card">
                <div className="our-team-photo">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={400}
                    className="our-team-image"
                  />
                </div>
                <div className="our-team-info">
                  <h3 className="our-team-name">{member.name}</h3>
                  <p className="our-team-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
