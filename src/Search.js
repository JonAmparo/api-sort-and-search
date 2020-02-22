import React, { useState } from 'react';

const Search = ({ searchPokemon }) => {
  const [query, setQuery] = useState('');
  console.log('SEARCH query:', query);

  const handleSubmit = e => {
    searchPokemon(query);
  };

  return (
    <form onKeyUpCapture={handleSubmit}>
      <input
        type='text'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </form>
  );
};

export default Search;
