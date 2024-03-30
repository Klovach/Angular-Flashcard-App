import { Component, OnInit } from '@angular/core';
import { Card } from '../models/cards.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardAppService } from '../services/flashcard-app.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})

export class EditCardComponent implements OnInit {
  selectedCard: Card | undefined;
  
  card: Card = {
    cardId: 0,
    deckId: 0,
    image: '',
    question: '',
    answer: ''
  };

  wasSubmitted: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private flashCardAppService: FlashcardAppService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const cardId = params['cardId'];
      this.flashCardAppService.readCards((cards: Card[]) => {
        this.selectedCard = cards.find(card => card.cardId === +cardId);
        // Check if selectedCard is defined, then assign its values to card
        if (this.selectedCard) {
          this.card.cardId = this.selectedCard.cardId;
          this.card.deckId = this.selectedCard.deckId;
          this.card.image = this.selectedCard.image;
          this.card.question = this.selectedCard.question;
          this.card.answer = this.selectedCard.answer;
        }
      });
    });
  }

  editCard(cardId: number): void {
    this.router.navigate(['/edit-card'], { queryParams: { cardId: cardId } });
  }

  onSubmit() {
    if (this.selectedCard) {
      this.flashCardAppService.updateCard(this.selectedCard, () => {
        // Callback function for successful update
        console.log("Card updated successfully!");
        this.wasSubmitted = true;
        this.router.navigate(['/view-deck'], { queryParams: { deckId: this.selectedCard!.deckId } });
      });
    }
  }
}