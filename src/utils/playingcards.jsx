import { v4 as uuidv4 } from 'uuid';
import PlayingCard from '../components/PlayingCard';
import '../components/PlayingCard.css';

export default async function playingcards(numCards) {
	const allCards = Array.from(['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'], (value, _) => [
		`${value}_hearts`,
		`${value}_diamonds`,
		`${value}_clubs`,
		`${value}_spades`,
	])
		.flat();

	// Shuffle the cards
	const shuffledCards = [...allCards].sort(() => Math.random() - 0.5);

	// Take the first numCards cards
	const selectedCards = shuffledCards.slice(0, numCards);

	// Create the cards with unique IDs
	const cards = selectedCards.map((cardString) => ({
		id: uuidv4(),
		component: <PlayingCard cardString={cardString} />,
	}));

	return cards;
}