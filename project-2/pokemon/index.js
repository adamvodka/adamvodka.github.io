const fetchPokemon = () => {
	const url = "https://pokeapi.co/api/v2/pokemon";

	fetch(url).then((res) => res.json()).then((pokemons) => renderPokemon(pokemons));
};

const renderPokemon = (pokemons) => {
	let html = ``;
	const pokemony = pokemons.results;
	console.log(pokemons.results);
	pokemony.forEach((pokemon) => {
		html += `
		    <div class="pokemon-cont">
		        <h2>${pokemon.name}</h2>
		        <p>${pokemon.id}</p>
		        <p>${pokemon.weight} lat</p>
		    </div>
		`;
	});

	const pokemonContainer = document.querySelector('[pokemon-data]');
	pokemonContainer.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', fetchPokemon);
