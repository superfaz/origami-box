import './App.css';
import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Masu from './Masu';

export default function App() {
  return (
    <div>
      <Nav />
      <div style={{ marginTop: '4rem' }}>
        <Masu />
      </div>
      <Footer />
    </div>
  );
}
