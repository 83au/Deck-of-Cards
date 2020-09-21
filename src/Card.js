import React, { Component } from 'react';

class Card extends Component {
  render() {
    const { image, value, suit, styles } = this.props;

    const elStyles = {
      ...styles,
      left: 'calc(50% - 5rem)',
      top: 0,
    }

    return (
      <img 
        style={elStyles}
        src={image}
        alt={`${value} of ${suit}`}
      />
    )
  }
}

export default Card;