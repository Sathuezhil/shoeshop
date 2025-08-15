'use client'

import { useState } from 'react'

interface Shoe {
  id: number
  name: string
  price: number
  color: string
  size: string[]
  image: string
  description: string
}

const shoes: Shoe[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 150,
    color: "Red/White",
    size: ["7", "8", "9", "10", "11"],
    image: "/api/placeholder/300/200",
    description: "Maximum comfort with Air Max technology"
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    price: 180,
    color: "Blue/Black",
    size: ["7", "8", "9", "10", "11", "12"],
    image: "/api/placeholder/300/200",
    description: "Responsive cushioning for ultimate performance"
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: 110,
    color: "White/Red",
    size: ["6", "7", "8", "9", "10"],
    image: "/api/placeholder/300/200",
    description: "Retro-inspired design with modern comfort"
  },
  {
    id: 4,
    name: "New Balance 574",
    price: 90,
    color: "Gray/Blue",
    size: ["7", "8", "9", "10", "11", "12"],
    image: "/api/placeholder/300/200",
    description: "Classic style meets everyday comfort"
  },
  {
    id: 5,
    name: "Converse Chuck Taylor",
    price: 65,
    color: "Black/White",
    size: ["6", "7", "8", "9", "10", "11"],
    image: "/api/placeholder/300/200",
    description: "Timeless design that never goes out of style"
  },
  {
    id: 6,
    name: "Vans Old Skool",
    price: 70,
    color: "Black/White",
    size: ["6", "7", "8", "9", "10", "11"],
    image: "/api/placeholder/300/200",
    description: "Iconic side stripe design with classic appeal"
  }
]

export default function ShoeGrid() {
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
  const [buying, setBuying] = useState<boolean>(false)

  const handleShoeClick = (shoe: Shoe) => {
    setSelectedShoe(shoe)
    setSelectedSize('')
    setQuantity(1)
  }

  const closeModal = () => {
    setSelectedShoe(null)
    setSelectedSize('')
    setQuantity(1)
    setBuying(false)
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleBuyNow = async () => {
    if (!selectedSize) {
      alert('Please select a size first!')
      return
    }

    setBuying(true)
    
    // Simulate buying process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const totalPrice = selectedShoe!.price * quantity
      alert(`Successfully purchased ${quantity} ${selectedShoe!.name} (Size: ${selectedSize}) for $${totalPrice}!`)
      
      closeModal()
    } catch (error) {
      alert('Purchase failed. Please try again.')
    } finally {
      setBuying(false)
    }
  }

  const totalPrice = selectedShoe ? selectedShoe.price * quantity : 0

  return (
    <section id="shoes" style={{ padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          color: 'white', 
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          Our Collection
        </h2>
        <p style={{ 
          fontSize: '1.1rem', 
          color: 'rgba(255,255,255,0.8)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Discover our premium selection of shoes with 3D preview capabilities
        </p>
      </div>

      <div className="shoe-grid">
        {shoes.map((shoe) => (
          <div
            key={shoe.id}
            className="shoe-card"
            onClick={() => handleShoeClick(shoe)}
          >
            <div style={{
              width: '100%',
              height: '200px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '10px',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem'
            }}>
              <span className="emoji-shoe">👟</span>
            </div>
            <h3>{shoe.name}</h3>
            <p style={{ marginBottom: '10px' }}>{shoe.description}</p>
            <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>${shoe.price}</p>
            <p style={{ marginBottom: '10px', fontSize: '0.9rem' }}>Color: {shoe.color}</p>
            <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {shoe.size.map((size) => (
                <span
                  key={size}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '15px',
                    fontSize: '0.8rem'
                  }}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Shoe Details and Purchase */}
      {selectedShoe && (
        <div className="purchase-modal" onClick={closeModal}>
          <div className="purchase-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>{selectedShoe.name}</h2>
            <div style={{
              width: '100%',
              height: '300px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '5rem'
            }}>
              <span className="modal-shoe">👟</span>
            </div>
            <p style={{ marginBottom: '15px', fontSize: '1.1rem' }}>{selectedShoe.description}</p>
            <p style={{ marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold' }}>
              ${selectedShoe.price}
            </p>
            <p style={{ marginBottom: '20px' }}>Color: {selectedShoe.color}</p>
            
            {/* Size Selection */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Select Size:</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {selectedShoe.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Quantity:</p>
              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="quantity-btn"
                >
                  -
                </button>
                <span style={{ fontSize: '1.2rem', minWidth: '30px' }}>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div style={{ marginBottom: '25px' }}>
              <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                Total: ${totalPrice}
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="cta-button">
                View in 3D
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!selectedSize || buying}
                className="buy-button"
              >
                {buying ? 'Processing...' : 'Buy Now'}
              </button>
            </div>

            <button
              onClick={closeModal}
              className="close-button"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
