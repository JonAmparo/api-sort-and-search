import React, { useState } from 'react';
import Pokemon from './Pokemon';
import Search from './Search';
import Sort from './Sort';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [display, setDisplay] = useState(false);
  const [sortType, setSortType] = useState('asc');
  const [count, setCount] = useState(0);
  const [api, setApi] = useState(false);

  const fetchPokemons = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
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

  const displayPokemon = () => {
    setDisplay(!display);
  };

  const searchPokemon = query => {
    if (query !== '') {
      let filtered = pokemons.filter(pokemon => pokemon.name.includes(query));
      setFiltered(filtered);
    } else if (query === '') {
      fetchPokemons();
    }
  };

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

  const renderSort = () => {
    if (pokemons.length > 0) {
      return <Sort sort={sort} sortType={sortType} />;
    }
  };

  const renderPokemons = () => {
    if (pokemons.length > 0 && sortType === 'asc') {
      return <Pokemon filtered={filtered} />;
    } else if (sortType === 'desc') {
      return <Pokemon filtered={filtered} />;
    }
  };

  return (
    <div className='container py-5 text-center'>
      <h1>Pokemons API Sort and Search</h1>
      <Search searchPokemon={searchPokemon}  />
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
