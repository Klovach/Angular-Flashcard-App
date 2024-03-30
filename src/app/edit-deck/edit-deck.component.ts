import { Component, OnInit } from '@angular/core';
import { DeckDTO } from '../models/decksDTO.model';
import { FlashcardAppService } from '../services/flashcard-app.service';
import { CardDTO } from '../models/cardsDTO.model';
import { Card } from '../models/cards.model';
import { Deck } from '../models/decks.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.css']
})

export class EditDeckComponent implements OnInit {
  selectedDeck: Deck | undefined;
  
  deck: Deck = {
    deckId: 0,
    userId: 1,
    image: '',
    name: '',
    description: '',
    cards: [],
  };

  cardsRaw: string = "";
  wasSubmitted: boolean = false;
  
  constructor(private route: ActivatedRoute, private router: Router, private service: FlashcardAppService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const deckId = params['deckId'];
      this.service.readDecks((decks: Deck[]) => {
        this.selectedDeck = decks.find(deck => deck.deckId === +deckId);
        // Check if selectedDeck is defined, then assign its values to deck
        if (this.selectedDeck) {
          this.deck.deckId = this.selectedDeck.deckId;
          this.deck.userId = this.selectedDeck.userId;
          this.deck.image = this.selectedDeck.image;
          this.deck.name = this.selectedDeck.name;
          this.deck.description = this.selectedDeck.description;
          this.deck.cards = this.selectedDeck.cards;

          // If the deck has cards, assign the cards to cardsRaw.
          if (this.selectedDeck.cards && this.selectedDeck.cards.length > 0) {
            // Use the map function to iterate over the cards and return a string with the question and answer separated by a colon.
            // The expression works like this:
            // 1. Iterate over the cards array using the map function. The map function takes a callback function as an argument.
            // 2. For each card, return a string with the question and answer separated by a colon.
            // 3. Join the strings with a newline character.
            this.cardsRaw = this.selectedDeck.cards.map(card => `${card.question}: ${card.answer}`).join('\n');
          }
        }
      });
    });
  }

  public onSubmit() {
    // Parse the Cards and add to the Deck then call the Service to create/update the Deck
    let cards: Card[] = [];
    let cardsAll = this.cardsRaw.split('\n');
    for (let i = 0; i < cardsAll.length; ++i) {
      let question = "";
      let answer = "";
      let cardInfo = cardsAll[i];
      // Use ":" to divide a string into two parts, the question and the answer. 
      // We now have an array of strings called cardParts. 
      let cardParts = cardInfo.split(':');
      // The first part is the question, the second is the answer. 
      if (cardParts.length == 2) {
        question = cardParts[0];
        answer = cardParts[1];
      }
      let cardId = Math.floor(Math.random() * 1000000); // Generate a unique card id
      let card: Card = {
        cardId: cardId,
        deckId: +this.deck.deckId, // Assign the deckid to the card
        image: '',
        question,
        answer
      };
      cards.push(card);
      // If Card has a card id, update the card. Otherwise, create a new card.
      if (card.cardId) {
        this.service.updateCard(card, () => {
          console.log('Card updated successfully!');
        });
      } else {
        this.service.createCard(card, i, this.deck.deckId, () => {
          console.log('Card created successfully!');
        });
      }
    }
    this.deck.cards = cards;
    console.log('Parsed cards:', cards);

    if (cards.length === 0) {
      console.error('No cards parsed from this.cardsRaw');
      return;
    }
  
    this.service.updateDeck(this.deck, () => {
      console.log("Deck updated successfully!");
    });

    this.wasSubmitted = true;
    this.router.navigate(['/view-deck'], { queryParams: { deckId: this.deck.deckId } });
  }
}
