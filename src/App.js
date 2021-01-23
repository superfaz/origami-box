import './App.css';
import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Masu from './Masu';

class App extends React.Component {

  render() {
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
}

export default App;
