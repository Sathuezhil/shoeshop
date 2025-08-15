'use client'

import { Suspense } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ShoeGrid from './components/ShoeGrid'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'

export default function Home() {
  return (
    <main>
      {/* UI Overlay */}
      <div className="ui-overlay">
        <Navbar />
        
        {/* First Section - Hero */}
        <section className="hero-section-container">
          <HeroSection />
        </section>
        
        {/* Second Section - Shoe Collection */}
        <section className="shoe-section-container">
          <ShoeGrid />
        </section>
        
        {/* Third Section - About */}
        <section className="about-section-container">
          <AboutSection />
        </section>
        
        {/* Fourth Section - Contact */}
        <section className="contact-section-container">
          <ContactSection />
        </section>
      </div>
    </main>
  )
}
