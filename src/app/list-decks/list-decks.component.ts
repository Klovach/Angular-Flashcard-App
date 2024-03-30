import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Deck } from '../models/decks.model';
import { Input } from '@angular/core';
import { Card } from '../models/cards.model';
import { FlashcardAppService } from '../services/flashcard-app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-decks',
  templateUrl: './list-decks.component.html',
  styleUrls: ['./list-decks.component.css']
})

// This is the ListDecksComponent class. 
export class ListDecksComponent {
  // We first define the decks array and the selectedDeck variable.
  // The decks array will store the list of decks, and the selectedDeck variable will store the selected deck.
  decks: Deck[] = [];
  selectedDeck: Deck | null = null;

  // We then define the constructor method, which takes in the FlashcardAppService and Router as parameters.
  // These services will be used to fetch the list of decks and navigate to the view deck page.
  constructor(
    private flashcardService: FlashcardAppService,
    private router: Router
  ) {}

  // The ngOnInit method is called when the component is initialized. 
  // A component in Angular is initialized when it is created and added to the DOM.
  // In this method, we call the readDecks method of the FlashcardAppService to fetch the list of decks.
  ngOnInit() {
    this.flashcardService.readDecks((decks: Deck[]) => {
      this.decks = decks;
    });
  }

  // The onSelectDeck method is called with a click event when a deck is selected from the list of decks.
  onSelectDeck(deck: any): void {
    this.selectedDeck = deck;
  }

  // The viewDeck method is called with a click event when the View Deck button is clicked.
  viewDeck(deckId: number): void {
    this.router.navigate(['/view-deck'], { queryParams: { deckId: deckId } });
  }
}


