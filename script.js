
// Versión 1:  extrae todos los datos de los Pokémon en una llamada inicial, y luego los procesa y ordena.

const poke_container = document.getElementById('poke-container');
const load_more_button = document.getElementById('load-more');
const pokemon_limit = 20;
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};

let offset = 0; 

async function getPokemonData() {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemon_limit}&offset=${offset}`);
    const pokemonData = response.data.results;


    const pokemonPromises = pokemonData.map(async (pokemon) => {
      const pokemonResponse = await axios.get(pokemon.url);
      return pokemonResponse.data;
    });


    const pokemonInfoList = await Promise.all(pokemonPromises);


    const sortedPokemon = pokemonInfoList.sort((a, b) => a.id - b.id);


    sortedPokemon.forEach((pokemon) => {
      createPokemonCard(pokemon);
    });
  } catch (error) {
    console.log(error);
  }
}


function createPokemonCard(pokemon) {
  const pokemonElement = document.createElement('div');
  pokemonElement.classList.add('pokemon');
  pokemonElement.style.backgroundColor = colors[pokemon.types[0].type.name];

  const paddedId = pokemon.id.toString().padStart(4, '0');

  const pokeInnerHTML = `
    <div class="img-container">
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    </div>
    <div class="info">
      <span class="number"># ${paddedId}</span>
      <h3 class="name">${pokemon.name}</h3>
      <small class="type">Type: <span>${pokemon.types[0].type.name}</span></small>
    </div>
  `;

  pokemonElement.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokemonElement);
}

function loadMorePokemon() {
  offset += pokemon_limit;
  getPokemonData();
}

load_more_button.addEventListener('click', loadMorePokemon);

getPokemonData(); 

/*

 // Versión 2: obtiene los datos de los Pokémon a medida que se van necesitando, almacenando los datos de todos los Pokémon en una variable separada.

const poke_container = document.getElementById('poke-container');
const load_more_button = document.getElementById('load-more');
const pokemon_limit = 20; // Número de Pokémon a mostrar en cada página
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};

let offset = 0; // Offset inicial
let pokemonData = []; // Almacenar los datos de los Pokémon

async function fetchPokemonData() {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemon_limit}&offset=${offset}`);
  pokemonData = pokemonData.concat(response.data.results);
}

async function getPokemonData() {
  if (pokemonData.length === 0 || offset >= pokemonData.length) {
    await fetchPokemonData();
  }

  const currentPageData = pokemonData.slice(offset, offset + pokemon_limit);

  const pokemonInfoList = await Promise.all(
    currentPageData.map(async (pokemon) => {
      const response = await axios.get(pokemon.url);
      return response.data;
    })
  );

  pokemonInfoList.forEach(createPokemonCard);

  offset += pokemon_limit;
}

function createPokemonCard(pokemon) {
  const pokemonElement = document.createElement('div');
  pokemonElement.classList.add('pokemon');
  pokemonElement.style.backgroundColor = colors[pokemon.types[0].type.name];

  const paddedId = pokemon.id.toString().padStart(4, '0');

  const pokeInnerHTML = `
    <div class="img-container">
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    </div>
    <div class="info">
      <span class="number"># ${paddedId}</span>
      <h3 class="name">${pokemon.name}</h3>
      <small class="type">Type: <span>${pokemon.types[0].type.name}</span></small>
    </div>
  `;

  pokemonElement.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokemonElement);
}

function loadMorePokemon() {
  getPokemonData();
}

load_more_button.addEventListener('click', loadMorePokemon);

getPokemonData(); 

// Versión 3: obtiene los datos de los Pokémon a medida que se van necesitando, realizando una nueva consulta a la API para cada Pokémon.

const poke_container = document.getElementById('poke-container');
const load_more_button = document.getElementById('load-more');
const pokemon_limit = 20;
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};

let offset = 0;

async function getPokemonData() {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemon_limit}&offset=${offset}`);
  const pokemonData = response.data.results;

  for (const pokemon of pokemonData) {
    const pokemonResponse = await axios.get(pokemon.url);
    const pokemonInfo = pokemonResponse.data;
    createPokemonCard(pokemonInfo);
  }

  offset += pokemon_limit;
}

function createPokemonCard(pokemon) {
  const pokemonElement = document.createElement('div');
  pokemonElement.classList.add('pokemon');
  pokemonElement.style.backgroundColor = colors[pokemon.types[0].type.name];

  const paddedId = pokemon.id.toString().padStart(4, '0');

  const pokeInnerHTML = `
    <div class="img-container">
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    </div>
    <div class="info">
      <span class="number"># ${paddedId}</span>
      <h3 class="name">${pokemon.name}</h3>
      <small class="type">Type: <span>${pokemon.types[0].type.name}</span></small>
    </div>
  `;

  pokemonElement.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokemonElement);
}

function loadMorePokemon() {
  getPokemonData();
}

load_more_button.addEventListener('click', loadMorePokemon);

getPokemonData(); */
