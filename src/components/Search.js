import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchPokemon }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    searchPokemon(query);
  };

  return (
    <form onKeyUpCapture={handleSubmit} className='my-3 align-center'>
      <input
        type='text'
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder='Search for a pokemon...'
      />
    </form>
  );
};

Search.propTypes = {
  searchPokemon: PropTypes.func.isRequired
};

export default Search;
