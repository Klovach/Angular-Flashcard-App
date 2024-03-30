import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../models/cards.model';
import { FlashcardAppService } from '../services/flashcard-app.service';
import { Deck } from '../models/decks.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css']
})
export class ListCardsComponent implements OnInit {
  @Input() cards!: Card[];
  selectedCard: Card | null = null;

  constructor(
    private flashcardService: FlashcardAppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.flashcardService.readCards((cards: Card[]) => {
      this.cards = cards;
    });
  }

  onSelectCard(card: any): void {
    this.selectedCard = card;
  }

  viewCard(cardId: number): void {
    this.router.navigate(['/view-card'], { queryParams: { cardId: cardId } });
  }
}
