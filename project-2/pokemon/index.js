// Button.addEventListener() => {
//   wygenerować url ... {ofset= };
//   clear main content
//   fetch url,
// }
console.log(window.location);

const url = "https://pokeapi.co/api/v2/pokemon?limit=30"; /*max is 898 */
// ################### URL z którego następuje rysowanie pokemonow

const fetchPokemons = () => {
  fetch(url)
    .then((res) => res.json())
    .then((pokemons) => renderPokemons(pokemons));
};

// ############3 funkcja rysująca

const renderPokemons = (pokemons) => {
  function getPokemonData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  }git 
  console.log(pokemons);
  // const pokemonContainer = document.querySelector(".pokemons-container");  to nie jest potrzebne
  const pokemony = pokemons.results;
  const promiseArray = [];
  pokemony.forEach((pokemon) => {
    // console.log(pokemon.url);
    const pokemonPromise = getPokemonData(pokemon.url);
    promiseArray.push(pokemonPromise);
  });

  Promise.all(promiseArray).then((dataArray) => {
    const sortedData = dataArray.sort((a, b) => a.id < b.id);
    sortedData.forEach((data) => {
      renderPokemon(data);
    });
  });
};

// ############### funkcja rysująca pojedynczego pokemona
const renderPokemon = (data) => {
  const pokemonsContainer = document.querySelector(".pokemons-container");
  // const pokemon = data.results;    to nie jest potrzebne
  console.log(data);
  const name = document.createElement("p");
  name.classList.add("pokemon-name");
  const id = document.createElement("p");
  id.classList.add("pokemon-id");
  const img = document.createElement("img");

  name.innerText = data.name;
  id.innerText = data.id;
  img.src = data.sprites.front_default;

  img.addEventListener("click", function () {
    if (img.src === data.sprites.front_default) {
      img.src = data.sprites.back_default;
    } else {
      img.src = data.sprites.front_default;
    }
  });

  const singlePokemon = document.createElement("div");
  singlePokemon.classList.add("single-pokemon");
  pokemonsContainer.append(singlePokemon);
  singlePokemon.append(name, id, img);
};

document.addEventListener("DOMContentLoaded", fetchPokemons);
