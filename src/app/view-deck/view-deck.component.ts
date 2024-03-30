import { ActivatedRoute } from '@angular/router';
import { Deck } from '../models/decks.model';
import { FlashcardAppService } from '../services/flashcard-app.service';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-view-deck',
  templateUrl: './view-deck.component.html',
  styleUrls: ['./view-deck.component.css']
})

// ViewDeckComponent implements OnInit. By implementing OnInit, we are able to define the ngOnInit method, which is called when the component is initialized.
export class ViewDeckComponent implements OnInit {
  selectedDeck: Deck | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private flashCardAppService: FlashcardAppService) { }
  // ngOnInit method is called when the component is initialized. In this method, we subscribe to the query parameters to get the deckId.
  ngOnInit(): void {
   // Here we subscribe to the query parameters to get the deckId.
    this.route.queryParams.subscribe(params => {
      const deckId = params['deckId'];
      if (!deckId) {
        console.error('Deck ID is undefined or not provided.');
        return;
      }
  
      this.flashCardAppService.readDecks((decks: Deck[]) => {
        if (!decks || decks.length === 0) {
          console.error('No decks found.');
          return;
        }
  
        this.selectedDeck = decks.find(deck => deck.deckId === +deckId);
        if (!this.selectedDeck) {
          console.error('Deck not found.');
          return;
        }

        if (!this.selectedDeck.cards) {
          console.error('No cards found in the selected deck.');
          return;
        }

        // Here we utilize the map method to convert the cardId to a number.
        // There have been instances where the cardId is a string, so for now, we convert it to a number utilizing map to be safe.
        this.selectedDeck.cards = this.selectedDeck.cards.map(card => {
          card.cardId = +card.cardId;
          return card;
        });
      });
    });
  }

  // The readDecks method is called to fetch the list of decks. The callback function is called with the list of decks as a parameter.
  readDecks(callback: (decks: Deck[]) => void): void {
    this.flashCardAppService.readDecks(callback);
  }

  // The editCard method is called with a click event when the Edit Card button is clicked.
  editDeck(deckId: number): void {
    this.router.navigate(['/edit-deck'], { queryParams: { deckId: deckId } });
  }

  // The deleteDeck method is called with a click event when the Delete Deck button is clicked.
  deleteDeck(deckId: number): void {
    this.flashCardAppService.deleteDeck(deckId, () => {
      this.router.navigate(['/decks']);
    });
  }

  editCard(cardId: number): void {
    this.router.navigate(['/edit-card'], { queryParams: { cardId: cardId } });
  }
  
  deleteCard(cardId: number): void {
    this.flashCardAppService.deleteCard(cardId, () => {
      this.router.navigate(['/view-deck'], { queryParams: { deckId: this.selectedDeck!.deckId } });
      window.location.reload(); // Reload the page after card is deleted
    });
  }
}
  