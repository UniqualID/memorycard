import NumberCard from '../components/NumberCard';
import '../components/NumberCard.css';
import { v4 as uuidv4 } from 'uuid';

export default async function numbercards(numCards) {
    // Create an array of numbers from 1 to numCards
    return Array.from({ length: numCards }, (_, i) => ({
        id: uuidv4(),
        component: <NumberCard number={i + 1} />,
    }));
} 