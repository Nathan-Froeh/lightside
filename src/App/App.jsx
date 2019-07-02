import React, { Component } from 'react';
import CardComponents from '../Card-Components/CardComponents';
import Nav from '../Nav/Nav'
import './App.scss';
import Opening from '../Opening/Opening';
import {Route, NavLink } from "react-router-dom";


class App extends Component {
  constructor() {
    super()
    this.state = {
      film: [],
      people: [],
      vehicles: [],
      planets: [],
      isFavorite: [],
      isHidden: false,
      group: 'people'
    }
  }
  
  componentDidMount = () => {
  //   const randomNumber = Math.floor(Math.random() * (6 - 0 + 1))
  //   setTimeout(() => {
  //     this.setState({ isHidden: true })
  //   }, 30000);
  //   fetch('https://swapi.co/api/films')
  //     .then(response => response.json())
  //     .then(data => this.setState({ film: data.results[randomNumber] }))
  //     .catch(err => console.log(err))

    fetch('https://swapi.co/api/people/')
      .then(response => response.json())
      .then(data => this.setState({people: data.results.map(person => {
        const info = [person.name, 
          person.birth_year, 
          person.gender, 
          person.height, 
          person.eye_color, 
          person.created]
        return info
      })}))
      .catch(err => console.log(err))

  //   fetch('https://swapi.co/api/vehicles')
  //     .then(response => response.json())
  //     .then(data => this.setState({ vehicles: data.results }))
  //     .catch(err => console.log(err))
    
  //   fetch('https://swapi.co/api/planets')
  //     .then(response => response.json())
  //     .then(data => this.setState({ planets: data.results}))
  //     .catch(err => console.log(err))
  }

  handleFavorite = (prop) => {
      const favorites = this.state.isFavorite

      if(!favorites.includes(prop)) {
        this.setState({isFavorite: [...favorites ,prop]})
      } else {
        const unfavorite = favorites.filter(favorite => favorite !== prop)
        this.setState({isFavorite: unfavorite})
      }
  }
  
  render() {
    console.log(this.state.isFavorite)
    return (
      <main className="App">
        {/* {!this.state.isHidden && <Opening film={this.state.film}/>} */}
        <nav>
          <h1>Light Side</h1>
          <div>
            <button>Favorites</button>
            <span></span>
          </div>
          <section>
            <NavLink to={'/'} className='nav'> Home </NavLink>
            <NavLink to='/people' className='nav'> People </NavLink>
            <NavLink to='/planets' className='nav'> Planets </NavLink>
            <NavLink to='/vehicles' className='nav'> Vehicles </NavLink>
          </section>
        </nav>
        {/* <CardComponents people={this.state.people}/> */}
        {/* <Route exact path='/' component={home}/> */}
        <Route 
          exact path='/people' 
          component={() => <CardComponents 
            group={this.state.people} 
            addFavorite={this.handleFavorite}/>}
        />
        <Route 
          exact path='/planets' 
          component={() => <CardComponents group={this.state.planets}/>}
        />
        <Route 
          exact path='/vehicles' 
          component={() => <CardComponents group={this.state.vehicles}/>}
        />
      </main>
    );
  }
}



export default App;
