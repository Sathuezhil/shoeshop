'use client'

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h2>About ShoeShop</h2>
          <p>Revolutionizing the way you shop for shoes</p>
        </div>
        
        <div className="about-features">
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Premium Quality</h3>
            <p>Curated collection of top brands with guaranteed authenticity and quality</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>30-day return policy with hassle-free exchanges and refunds</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Free shipping on orders over $100 with express delivery options</p>
          </div>
        </div>
        
        <div className="about-story">
          <h3>Our Story</h3>
          <p>
            Founded in 2024, ShoeShop was born from a simple idea: shopping for shoes should be 
            exciting, interactive, and hassle-free. We combine cutting-edge 3D technology with 
            a carefully curated selection of premium footwear to create an unparalleled shopping experience.
          </p>
          <p>
            Our mission is to help you find the perfect pair of shoes that not only look great 
            but feel amazing on your feet. Whether you're looking for athletic performance, 
            casual comfort, or formal elegance, we've got you covered.
          </p>
        </div>
      </div>
    </section>
  )
}
