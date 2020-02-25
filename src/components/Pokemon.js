import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function Pokemon({ filtered }) {
  const renderPokemon = () => {
    return filtered.map((pokemon, index) => {
      return (
        <li key={index}>
          <a href={pokemon.url}>{pokemon.name}</a>
        </li>
      );
    });
  };

  return (
    <Fragment>
      <h2>pokemon list </h2>
      <ul className='text-center list-unstyled'>{renderPokemon()}</ul>
    </Fragment>
  );
}

Pokemon.propTypes = {
  filtered: PropTypes.array.isRequired
};

export default Pokemon;
