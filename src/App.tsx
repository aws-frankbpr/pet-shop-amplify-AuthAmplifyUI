import React, { useState } from 'react';
import { Authenticator, useTheme, View, Image, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
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
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const { tokens } = useTheme();

  const formFields = {
    signUp: {
      email: {
        order: 1,
        isRequired: true,
        placeholder: 'Enter your email'
      },
      password: {
        order: 2,
        isRequired: true,
        placeholder: 'Enter your password'
      },
      confirm_password: {
        order: 3,
        isRequired: true,
        placeholder: 'Confirm your password'
      }
    },
    signIn: {
      username: {
        order: 1,
        isRequired: true,
        placeholder: 'Enter your email'
      },
      password: {
        order: 2,
        isRequired: true,
        placeholder: 'Enter your password'
      }
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

  return (
    <div className="auth-wrapper">
      <Authenticator 
        formFields={formFields}
        initialState="signIn"
        loginMechanisms={['email']}
        components={{
          Header() {
            return (
              <View className="auth-header">
                <div className="auth-logo">
                  <span role="img" aria-label="paw">🐾</span>
                </div>
                <Text className="auth-title">Pet Shop</Text>
                <Text className="auth-subtitle">Find your perfect companion</Text>
              </View>
            );
          },
          SignIn: {
            Header() {
              return (
                <View className="auth-form-header">
                  <Text className="auth-form-title">Welcome Back!</Text>
                  <Text className="auth-form-subtitle">Sign in to your account</Text>
                </View>
              );
            },
            Footer() {
              return (
                <View className="auth-footer">
                  <Text>Don't have an account?</Text>
                  <button className="auth-switch-button">Sign up now</button>
                </View>
              );
            }
          },
          SignUp: {
            Header() {
              return (
                <View className="auth-form-header">
                  <Text className="auth-form-title">Create Account</Text>
                  <Text className="auth-form-subtitle">Join our pet-loving community</Text>
                </View>
              );
            },
            Footer() {
              return (
                <View className="auth-footer">
                  <Text>Already have an account?</Text>
                  <button className="auth-switch-button">Sign in</button>
                </View>
              );
            }
          }
        }}
      >
        {({ signOut, user }) => (
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
                    Hello, {user?.signInDetails?.loginId}
                  </span>
                  <button onClick={signOut} className="sign-out-button">
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
                {filteredPets.map((pet: Pet) => (
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
        )}
      </Authenticator>
    </div>
  );
};

export default App;
