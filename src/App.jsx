import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

const Card = ({ name, url }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setPokemonData(response.data);
      })
      .catch(error => {
        console.error('Error fetching Pokemon data:', error);
      });
  }, [url]);

  return (
    <div className="pokemon-card">
      <h2>{name}</h2>
      {pokemonData && (
        <>
          <img src={pokemonData.sprites.front_default} alt={name} />
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
        </>
      )}
    </div>
  );
};

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/')
      .then(response => {
        setPokemonList(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching Pokemon list:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Покемон лист</h1>
      <div className="pokemon-container">
        {pokemonList.map(pokemon => (
          <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
};

export default App;