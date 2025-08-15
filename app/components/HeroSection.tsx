'use client'

import ShoeViewer from './ShoeViewer'

export default function HeroSection() {
  return (
    <div id="home" className="hero-section">
      <div className="hero-content">
        <h1>Step into the Future</h1>
        <p>Experience shoes like never before with our cutting-edge 3D visualization technology</p>
        
        <div className="cta-buttons">
          <a href="#shoes" className="cta-button">Explore Collection</a>
          <button className="cta-button primary">Learn More</button>
        </div>
      </div>
      
      {/* 3D GLB Shoe Model */}
      <div className="hero-shoe-display">
        <ShoeViewer />
      </div>
    </div>
  )
}
