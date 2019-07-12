import React from 'react';
import Card from '../Card/Card.jsx'
import './CardComponents.scss'
import Home from '../Home/Home.jsx';
import loading from '../images/giphy.gif'
import PropTypes from 'prop-types'

const CardComponents = ({group, addFavorite, crawl}) => {
  const page = window.location.href
  const loadingIcon = (<img src={loading} alt='Loading gif' className='loading-gif'/>)
  const cards = group.map((person, i) => {

    return (<Card 
    props={person} 
    id={person[5]} 
    key={person[5] + i}
    addFavorite={addFavorite}
  />)})

  // 'https://nathan-froeh.github.io/lightside/'

  return (
    <section className='cardComponents'>

      {page === 'https://nathan-froeh.github.io/lightside/' && crawl.title === '' && loadingIcon}

      {page === 'https://nathan-froeh.github.io/lightside/' && crawl.title !== '' && <Home crawl={crawl} loadingIcon={loadingIcon}/>}

      {page !== 'https://nathan-froeh.github.io/lightside/' 
        && page !== 'https://nathan-froeh.github.io/lightside/favorites' 
        && group.length === 0 && loadingIcon
      }

      {group.length !== 0 && page !== 'https://nathan-froeh.github.io/lightside/' && cards}

      {group.length === 0 && page === 'https://nathan-froeh.github.io/favorites' 
        && <h2>You do not have any favorites</h2>
      }

    </section>
  )
}

CardComponents.propTypes = {
  group: PropTypes.array, 
  addFavorite: PropTypes.func,
  crawl: PropTypes.object
}

export default CardComponents;