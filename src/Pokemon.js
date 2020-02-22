import React, { Fragment } from 'react';

function Pokemon({ filtered, counter }) {
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

export default Pokemon;
