import PokemonCard from '../components/PokemonCard';
import '../components/PokemonCard.css';

export default async function pokemoncards(numCards) {
	const pokeSpeciesResp = await fetch('https://pokeapi.co/api/v2/pokemon-species/');
	const pokemonCount = (await pokeSpeciesResp.json()).count;

	const randIds = new Set();
	while (randIds.size < numCards) {
		const randId = Math.floor(Math.random() * pokemonCount) + 1;
		randIds.add(randId);
	}

	const pokemonData = await Promise.all(Array.from(randIds).map(async (id) => {
		const pokeResp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const pokeData = await pokeResp.json();
		return pokeData;
	}));

	return pokemonData.map((pkdata) => ({
		id: pkdata.id,
		component: (
			<PokemonCard
				name={pkdata.name}
				image={pkdata.sprites.other['official-artwork'].front_default}
			/>
		),
	}));
}