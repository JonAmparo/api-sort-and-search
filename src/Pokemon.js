import React, { Fragment } from 'react';

function Pokemon({ filtered }) {
  const renderPokemon = () => {
    return filtered.map((pokemon, index) => {
      return (
        <tr key={index}>
          <td>
            <h3>
              <a href={pokemon.url}>{pokemon.name}</a>
            </h3>
          </td>
        </tr>
      );
    });
  };

  return (
    <Fragment>
      <h2>pokemon list </h2>
      <table>
        <tbody>{renderPokemon()}</tbody>
      </table>
    </Fragment>
  );
}

export default Pokemon;
