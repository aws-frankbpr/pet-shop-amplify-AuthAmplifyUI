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
    {
      id: 3,
      name: "Bella",
      category: "cats",
      breed: "Siamese",
      age: 1,
      price: 1000,
      imageUrl: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg"
    },
    {
      id: 4,
      name: "Rocky",
      category: "dogs",
      breed: "Labrador",
      age: 3,
      price: 1300,
      imageUrl: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg"
    }
  ];

  const filteredPets = selectedCategory === 'all' 
    ? pets 
    : pets.filter(pet => pet.category === selectedCategory);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">
          <span role="img" aria-label="paw">🐾</span> Pet Shop
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header className="hero">
        <h1>Welcome to Our Pet Shop</h1>
        <p>Find your perfect companion today</p>
      </header>

      <main className="main-content">
        <div className="filters">
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

        <div className="pets-grid">
          {filteredPets.map(pet => (
            <div key={pet.id} className="pet-card">
              <img src={pet.imageUrl} alt={pet.name} className="pet-image" />
              <div className="pet-info">
                <h3>{pet.name}</h3>
                <p className="breed">{pet.breed}</p>
                <p className="age">{pet.age} year(s) old</p>
                <p className="price">${pet.price}</p>
                <button className="adopt-button">Adopt Now</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@petshop.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
          <div className="footer-section">
            <h3>Location</h3>
            <p>123 Pet Street</p>
            <p>Anytown, ST 12345</p>
          </div>
          <div className="footer-section">
            <h3>Hours</h3>
            <p>Mon-Sat: 9am-7pm</p>
            <p>Sun: 10am-5pm</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Pet Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
