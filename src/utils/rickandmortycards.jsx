import RickAndMortyCard from '../components/RickAndMortyCard';
import '../components/RickAndMortyCard.css';
import { v4 as uuidv4 } from 'uuid';

const TOTAL_CHARACTERS = 826; // As of now, update if needed

export default async function rickandmortycards(numCards) {
    // Get N unique random character IDs
    const randIds = new Set();
    while (randIds.size < numCards) {
        const randId = Math.floor(Math.random() * TOTAL_CHARACTERS) + 1;
        randIds.add(randId);
    }
    const idsArr = Array.from(randIds);
    // Fetch all characters in one API call
    const resp = await fetch(`https://rickandmortyapi.com/api/character/${idsArr.join(',')}`);
    const data = await resp.json();
    // If only one character, data is an object, not array
    const characters = Array.isArray(data) ? data : [data];
    return characters.map((char) => ({
        id: uuidv4(),
        component: <RickAndMortyCard name={char.name} image={char.image} />,
    }));
} 