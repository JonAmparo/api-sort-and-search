import React, { useState } from 'react';

const Search = ({ searchPokemon }) => {
  const [query, setQuery] = useState('');
  console.log('SEARCH query:', query);

  const handleSubmit = e => {
    searchPokemon(query);
  };

  return (
    <form onKeyUpCapture={handleSubmit} className='my-3 align-center'>
      <input
        type='text'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </form>
  );
};

export default Search;
