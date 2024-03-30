import { CardDTO } from './cardsDTO.model';
// This is our Flashcard model. 
// It is a representation of the album data that we will be working with.
// Export interface Flashcard makes the Flashcard interface available to other modules.
// This is done by using the export keyword. Export interface seems to be unique to TypeScript. 
export interface DeckDTO {
    userid: number;
    image: string;
    name: string;
    description: string,
    cards?: CardDTO[];
}