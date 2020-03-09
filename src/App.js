/* app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict("@@sampleTrain");
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts']
      })
*/
import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';

const app = new Clarifai.App({
  apiKey: '76f52a4ce02644b8909bcb676a75cf51'
  });

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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

displayFaceBox = (box) => {
  console.log(box);
  this.setState({ box: box });
}

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
        )
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
  }

  onRouteChange = () => {
    this.setState({route: 'home'});
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={ particlesOptions }
        />
        <Navigation />
        { this.state.route = 'signin'
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange = {this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box = {this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
        }
      </div>
    );
  }
}

export default App;

