import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const pets = [
    {
      id: 1,
      name: "Luna",
      category: "cats",
      breed: "Persian",
      age: 2,
      price: 1200,
      imageUrl: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg"
    },
    {
      id: 2,
      name: "Max",
      category: "dogs",
      breed: "Golden Retriever",
      age: 1,
      price: 1500,
      imageUrl: "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg"
    },
    // Add more pets as needed
  ];

  const filteredPets = selectedCategory === 'all' 
    ? pets 
    : pets.filter(pet => pet.category === selectedCategory);

  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <span className="paw-icon">🐾</span>
          <h1>Lovely Pets</h1>
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#pets">Our Pets</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Find Your Perfect Companion</h2>
          <p>Bringing happiness to homes, one pet at a time</p>
          <button className="cta-button">Adopt Now</button>
        </div>
      </section>

      <section className="pet-filter">
        <div className="filter-buttons">
          <button 
            className={selectedCategory === 'all' ? 'active' : ''} 
            onClick={() => setSelectedCategory('all')}
          >
            All Pets
          </button>
          <button 
            className={selectedCategory === 'dogs' ? 'active' : ''} 
            onClick={() => setSelectedCategory('dogs')}
          >
            Dogs
          </button>
          <button 
            className={selectedCategory === 'cats' ? 'active' : ''} 
            onClick={() => setSelectedCategory('cats')}
          >
            Cats
          </button>
        </div>
      </section>

      <section className="pets-grid">
        {filteredPets.map(pet => (
          <div key={pet.id} className="pet-card">
            <div className="pet-image">
              <img src={pet.imageUrl} alt={pet.name} />
            </div>
            <div className="pet-info">
              <h3>{pet.name}</h3>
              <p className="breed">{pet.breed}</p>
              <p className="age">{pet.age} years old</p>
              <div className="price-adopt">
                <span className="price">${pet.price}</span>
                <button className="adopt-button">Adopt Me</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="features">
        <div className="feature">
          <span className="feature-icon">🏠</span>
          <h3>Safe Homes</h3>
          <p>All our pets go to carefully screened homes</p>
        </div>
        <div className="feature">
          <span className="feature-icon">💉</span>
          <h3>Vet Checked</h3>
          <p>Complete medical examination and vaccinations</p>
        </div>
        <div className="feature">
          <span className="feature-icon">❤️</span>
          <h3>Love & Care</h3>
          <p>Raised with love and professional care</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>📞 (555) 123-4567</p>
            <p>📧 info@lovelypets.com</p>
            <p>🏠 123 Pet Street, Pawsome City</p>
          </div>
          <div className="footer-section">
            <h4>Opening Hours</h4>
            <p>Monday - Friday: 9am - 7pm</p>
            <p>Saturday: 10am - 6pm</p>
            <p>Sunday: 11am - 5pm</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <span>📱</span>
              <span>📘</span>
              <span>📸</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Lovely Pets. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
