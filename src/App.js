import React, { useState } from 'react';
import Pokemon from './Pokemon';
import Search from './Search';
import Sort from './Sort';

function App() {
  const [pokemons, setPokemons] = useState([]); // placeholder for pokemons
  const [filtered, setFiltered] = useState([]); // Filter when querying for a pokemon
  const [display, setDisplay] = useState(false); // Shows/Hides pokemon list
  const [sortType, setSortType] = useState('asc'); // Sort by alphabetical order
  const [count, setCount] = useState(0); // Counts fetch API to see if there're any leaks on API calls (There's none :)
  const [api, setApi] = useState(false); // Calls API once with button

  // Fetches pokemon (I can put this in a custom hook)
  const fetchPokemons = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=150`)
      .then(response => response.json())
      .then(json => {
        setPokemons(json.results);
        setFiltered(json.results);
        setCount(count + 1);
        setApi(true);
        console.log('API call count:', count);
      })
      .catch(e => console.error(e));
  };

  // Shows/Hide pokemon list
  const displayPokemon = () => {
    setDisplay(!display);
  };

  // Search - Queries through pokemon and shows relavent pokemons
  const searchPokemon = query => {
    if (query !== '') {
      let filtered = pokemons.filter(pokemon => pokemon.name.includes(query));
      setFiltered(filtered);
    } else if (query === '') {
      setFiltered(pokemons);
    }
  };

  // Sort alphabetically - ( helper function )
  const sort = sortType => {
    if (sortType === 'asc') {
      setPokemons(
        pokemons.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      );
      setFiltered(
        filtered.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      );
      setSortType('asc');
    } else if (sortType === 'desc') {
      setPokemons(
        pokemons.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        })
      );
      setFiltered(
        filtered.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        })
      );
      setSortType('desc');
    }
  };

  // Renders Pokemon in alphabetical order (UI)
  const renderSort = () => {
    if (pokemons.length > 0) {
      return <Sort sort={sort} sortType={sortType} />;
    }
  };

  // Renders pokemon (Can be refactored)
  const renderPokemons = () => {
    if (sortType === 'asc') {
      return <Pokemon filtered={filtered} />;
    } else if (sortType === 'desc') {
      return <Pokemon filtered={filtered} />;
    }
  };

  return (
    <div className='container py-5 text-center'>
      <h1>Pokemons API Sort and Search</h1>
      <Search searchPokemon={searchPokemon} />
      {!api ? (
        <div>
          <button
            onClick={() => {
              fetchPokemons();
              displayPokemon();
            }}
          >
            Call API / Show Pokemons
          </button>
        </div>
      ) : (
        <div>
          {display ? (
            <div>
              <button onClick={displayPokemon}>Hide Pokemons</button>
              {renderSort()}
              {renderPokemons()}
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  displayPokemon();
                }}
              >
                Show Pokemons
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
