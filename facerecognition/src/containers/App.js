import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

import Navigation from "../components/Navigation/Navigation";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Output from "../components/Output/Output";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "<YOUR_API_HERE>"
});

const particleOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 3000
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    }
  },
  retina_detect: true
};

const intialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  faceCount: null,
  error: "",
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = intialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  calculateFaceLocation = data => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    let count = 0;

    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;

      count++;
      this.setState({ faceCount: count });
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
      };
    });
  };

  displayFaceBox = boxes => {
    this.setState({ boxes });
  };

  onInputChange = event => {
    const input = event.target.value;

    this.setState({ input });
  };

  onButtonSubmit = e => {
    e.preventDefault();
    const input = this.state.input;
    this.setState({
      imageUrl: input,
      error: ""
    });

    if (input) {
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response => {
          console.log(response);
          if (response) {
            fetch("http://localhost:3000/image", {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: this.state.user.id
              })
            });
          }
          this.displayFaceBox(this.calculateFaceLocation(response));
        })
        .catch(error => {
          const errorMessage = error.data.status.description;
          this.setState({ error: errorMessage });
        });
    }
  };

  onRouteChange = route => {
    if (route === "signin") {
      this.setState(intialState);
    } else if (route === "home") {
      this.setState({
        isSignedIn: true
      });
    }
    this.setState({
      route
    });
  };

  render() {
    const {
      faceCount,
      boxes,
      imageUrl,
      error,
      isSignedIn,
      route,
      user
    } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {route === "home" ? (
          <div>
            <Logo />
            <Output
              faceCount={faceCount}
              name={user.name[0].toUpperCase() + user.name.substr(1)}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition error={error} boxes={boxes} imageURL={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
