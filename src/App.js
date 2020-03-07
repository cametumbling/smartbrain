//
//
// <FaceRecognition />

import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';



const particlesOptions ={


      "particles": {
          "number": {
              "value": 50
          },
          "size": {
              "value": 3
          },
          "density": {
            "enable": true,
            "value-area": 800
          },
      },
      "interactivity": {
          "events": {
              "onhover": {
                  "enable": true,
                  "mode": "repulse"
              }
          }
      }
}


function App() {
  return (
    <div className="App">
      <Particles className='particles'
        params={ particlesOptions }
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    </div>
  );
}

export default App;

