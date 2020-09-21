import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import './Deck.css';


class Deck extends Component {
  constructor() {
    super();
    this.state = { 
      remaining: 52,
      cards: [],
    };
    this.draw = this.draw.bind(this);
  }


  async componentDidMount() {
    const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle');
    const { deck_id, remaining } = response.data;
    this.deck_id = deck_id;
    this.setState({ remaining });
  }


  async draw() {
    try {
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deck_id}/draw/`);
      const { remaining, cards: [{ image, value, suit }] } = response.data;

      const rand = n => Math.floor(Math.random() * n);

      const r = rand(40);
      const y = rand(50);
      const negR = rand(2) === 1 ? '' : '-';
      const negY = rand(2) === 1 ? '' : '-';

      const styles = {
        position: 'absolute',
        transform: `rotate(${negR}${r}deg) translateY(${negY}${y}px)`
      };

      const card = {
        image,
        value,
        suit,
        styles,
        id: value + suit
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
          onClick={this.draw}
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