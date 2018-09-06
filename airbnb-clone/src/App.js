import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import logo from './logo.svg';
import './App.css';
import Flat from './components/flat';
import Marker from './components/maker';
// import Marker from './components'

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      flats: [],
      selectFlat: null
    };
  }

  componentDidMount() {
    const url = 'https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json'
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        flats:data
      })
    })
  }
    selectFlat = (flat) => {
      this.setState({
        selectFlat:flat
      })
      console.log(flat);
    }
 
  render() {

    let center = {
      lat: 48.8566,
      lng: 2.3522
    }

    if(this.state.selectFlat){
      center = {
      lat: this.state.selectFlat.lat,
      lng: this.state.selectFlat.lng
      }
    }
    return (
      <div className="app">
        <div className="main">
          <div className="search">
          </div>
          <div className="flats">
            {this.state.flats.map((flat) => {
              return <Flat 
              key={flat.name} 
              flat={flat} 
              selectFlat={this.selectFlat} />
            })}
          </div>
        </div>
        <div className="map">
              <GoogleMapReact
              center = {center}
              zoom = {11}
              >
              {this.state.flats.map((flat) => {
                console.log(flat)
              return <Marker 
              key={flat.name}
              lat={flat.lat} 
              lng={flat.lng} 
              text={flat.price}
              selected = { flat === this.state.selectFlat}
              />
            })}
              </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
