import React, { Component } from 'react';
import CardComponents from '../Card-Components/CardComponents';
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
      page: 'people'
    }
  }
  
  componentDidMount = () => {
    // const randomNumber = Math.floor(Math.random() * (6 - 0 + 1))
    // setTimeout(() => {
    //   this.setState({ isHidden: true })
    // }, 30000);
    // fetch('https://swapi.co/api/films')
    //   .then(response => response.json())
    //   .then(data => this.setState({ film: data.results[randomNumber] }))
    //   .catch(err => console.log(err))

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

    fetch('https://swapi.co/api/vehicles')
      .then(response => response.json())
      .then(data => this.setState({vehicles: data.results.map(vehicle => {
        const info = [
          vehicle.name,
          vehicle.model,
          vehicle.vehicle_class,
          vehicle.passengers,
          null,
          vehicle.created
        ]
        return info
      })}))
      .catch(err => console.log(err))
    
    fetch('https://swapi.co/api/planets')
      .then(response => response.json())
      .then(data => this.setState({planets: data.results.map(planet => {
        const info = [
          planet.name,
          planet.terrain,
          planet.diameter,
          planet.population,
          null,
          planet.created
        ]
        return info
      })}))
      .catch(err => console.log(err))
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

  updateGroup = (string) => {
    this.setState({page: string})
  }
  
  render() {
    console.log(this.state.isFavorite)
    return (
      <main className="App">
        {/* {!this.state.isHidden && <Opening film={this.state.film}/>} */}
        <nav>
          <h1>Light Side</h1>
          <section>
            <NavLink 
              to={'/'} 
              className='nav' 
              onClick={() => this.updateGroup('home')}
              > 
                Home 
            </NavLink>
            <NavLink 
              to='/people' 
              className='nav' 
              onClick={() => this.updateGroup('people')}
              > 
                People 
            </NavLink>
            <NavLink 
              to='/planets' 
              className='nav' 
              onClick={() => this.updateGroup('planets')}
              > 
                Planets 
            </NavLink>
            <NavLink 
              to='/vehicles' 
              className='nav' 
              onClick={() => this.updateGroup('vehicles')}
              > 
                Vehicles 
            </NavLink>
            <NavLink 
              to='/favorites' 
              className='nav' 
              onClick={() => this.updateGroup('favorites')}
              > 
                Favorites<span>{this.state.isFavorite.length}</span>
            </NavLink>
          </section>
        </nav>

        <Route 
          exact path='/people' 
          component={() => <CardComponents 
            group={this.state.people} 
            addFavorite={this.handleFavorite}
            page={this.state.page}
            />}
        />
        <Route 
          exact path='/planets' 
          component={() => <CardComponents 
            group={this.state.planets}
            addFavorite={this.handleFavorite}
            page={this.state.page}
            />}
        />
        <Route 
          exact path='/vehicles' 
          component={() => <CardComponents 
            group={this.state.vehicles}
            addFavorite={this.handleFavorite}
            page={this.state.page}
            />}
        />
        <Route 
          exact path='/favorites' 
          component={() => <CardComponents 
            group={this.state.isFavorite}
            addFavorite={this.handleFavorite}
            page={this.state.page}
            />}
        />
      </main>
    );
  }
}



export default App;
