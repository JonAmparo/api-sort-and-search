import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import Search from './Search';
import Sort from './Sort';

function App() {
  const [pokemons, setPokemons] = useState([]);
  console.log('pokemons:', pokemons);
  const [filtered, setFiltered] = useState([]);
  console.log('filtered:', filtered);
  const [display, setDisplay] = useState(false);
  const [sortType, setSortType] = useState('asc');
  const [count, setCount] = useState(0);
  const [api, setApi] = useState(false);

  useEffect(() => {
    // fetchPokemons();
  }, []);

  const fetchPokemons = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
      .then(response => response.json())
      .then(json => {
        setPokemons(json.results);
        setFiltered(json.results);
        setCount(count + 1);
        console.log('API call count:', count);

        // Automatically sort Asc
        // let sorted = json.results.sort((a, b) => {
        //   if (a.name < b.name) {
        //     return -1;
        //   }
        //   if (a.name > b.name) {
        //     return 1;
        //   }
        //   return 0;
        // });
        // setPokemons(sorted);
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
      // return <Pokemon pokemons={pokemons} filtered={filtered} />;
      return <Pokemon filtered={filtered} />;
    } else if (sortType === 'desc') {
      // return <Pokemon pokemons={pokemons} filtered={filtered} />;
      return <Pokemon filtered={filtered} />;
    }
  };

  return (
    <div>
      <h2>Pokemons API Sort and Search</h2>
      <Search searchPokemon={searchPokemon} />
      {/* <button onClick={renderPokemons()}> Load Pokemons</button> */}

      {!api ? (
        <button onClick={fetchPokemons}>Call API</button>
      ) : (
        <div>false</div>
      )}

      {display ? (
        <div>
          <button onClick={displayPokemon}>Hide Pokemons</button>
          {renderSort()}
          {renderPokemons()}
        </div>
      ) : (
        <div>
          {/* <button onClick={displayPokemon}>Show Pokemons</button> */}
          <button
            onClick={() => {
              displayPokemon();
            }}
          >
            Show Pokemons
          </button>
        </div>
      )}

      {/* <table>
        <tbody>
          {pokemons.map((pokemons, index) => (
            <tr key={index}>
              <td>
                <h3>
                  #{count++}) <a href={pokemons.url}>{pokemons.name}</a>
                </h3>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default App;
