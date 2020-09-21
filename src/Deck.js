import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import './Deck.css';


class Deck extends Component {
  constructor() {
    super();
    this.state = { 
      deck_id: null, 
      remaining: 52,
      cards: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }


  async componentDidMount() {
    const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle');
    const { deck_id, remaining } = response.data;
    this.setState({ deck_id, remaining });
  }


  async handleClick() {
    const { deck_id } = this.state;

    try {
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/`);
      const { remaining, cards: [{ image, value, suit }] } = response.data;

      const r = Math.floor(Math.random() * 50);
      const y = Math.floor(Math.random() * 50);

      const negR = Math.floor(Math.random() * 2) === 1 ? '' : '-';
      const negY = Math.floor(Math.random() * 2) === 1 ? '' : '-';

      const styles = {
        position: 'absolute',
        transform: `rotate(${negR}${r}deg) translateY(${negY}${y}px)`
      };

      const card = {
        image,
        value,
        suit,
        styles,
        id: Math.random()
      }
      this.setState({ cards: [...this.state.cards, card], remaining });

    } catch (err) {
      alert('Error: No more cards remaining in deck');
    }  
  }
  

  render() {
    const cards = this.state.cards.map(card => (
      <Card
        key={card.id}
        image={card.image}
        value={card.value}
        suit={card.suit}
        styles={card.styles}
      />
    ));

    return (
      <div className="Deck">
        <h1>Deck of Cards</h1>
        <button 
          className="Deck-btn" 
          onClick={this.handleClick}
        >
          Draw Card
        </button>
        <div className="Deck-cards">
          {cards}
        </div>
      </div>
    );
  }
}

export default Deck;