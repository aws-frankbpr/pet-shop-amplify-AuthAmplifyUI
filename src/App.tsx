import React, { useEffect, useState } from 'react';
import { signInWithRedirect, signOut, getCurrentUser } from 'aws-amplify/auth';
import type { AuthUser } from '@aws-amplify/auth';
import './App.css';

interface Pet {
  id: number;
  name: string;
  category: 'dogs' | 'cats';
  breed: string;
  age: number;
  price: number;
  imageUrl: string;
}

type Category = 'all' | 'dogs' | 'cats';

const App: React.FC = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    } catch (err) {
      setUser(null);
      setIsLoading(false);
      await signInWithRedirect();
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut({ global: true }); // Add the global option
      setUser(null);
      // Remove the manual redirect as it will happen automatically with global sign-out
      // await signInWithRedirect();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const pets: Pet[] = [
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

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return null; // The redirect will happen automatically
  }

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
          <div className="user-section">
            <span className="username">
              Hello, {user.signInDetails?.loginId || user.username}
            </span>
            <button onClick={handleSignOut} className="sign-out-button">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

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
    </div>
  );
};

export default App;
