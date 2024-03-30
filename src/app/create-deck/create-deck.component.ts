import { Component, OnInit } from '@angular/core';
import { DeckDTO } from '../models/decksDTO.model';
import { FlashcardAppService } from '../services/flashcard-app.service';
import { CardDTO } from '../models/cardsDTO.model';
import { Card } from '../models/cards.model';
import { Deck } from '../models/decks.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css']
})

export class CreateDeckComponent implements OnInit {
  // Here we initialize a placeholder for the deck. 
  deck: Deck = {
    deckId: Math.floor(Math.random() * 1000000),
    userId: 1,
    image: "",
    name: "",
    description:"",
    cards: [],
  };

  cardsRaw: string = "";
  wasSubmitted: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private service: FlashcardAppService) { }

  ngOnInit() {
  }

  // We call the onSubmit method when the form is submitted after the user clicks submit.
  public onSubmit() {
    // Parse the Cards and add to the Deck then call the Service to create the new Deck
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
      let cardid = Math.floor(Math.random() * 1000000); // Generate a unique card id
      cards.push({
        cardId: cardid,
        deckId: this.deck.deckId, // Assign the deckid to the card
        image: '',
        question,
        answer
      });
    }
    this.deck.cards = cards;
    console.log('Parsed cards:', cards);

    if (cards.length === 0) {
      console.error('No cards parsed from this.cardsRaw');
      return;
    }
  
    // If all else passes, we call the createDeck method of the FlashcardAppService to create the deck.
    this.service.createDeck(this.deck, () => {
      console.log("Deck created successfully!");
      (error: any) => {
        console.error("Error creating deck:", error);
      }

    // If the deck is created successfully, we set wasSubmitted to true.
    this.wasSubmitted = true;
    this.router.navigate(['/decks']);
    });
  }
}
