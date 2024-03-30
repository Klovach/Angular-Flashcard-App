import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { FlashcardAppService } from '../services/flashcard-app.service';
import { Card } from '../models/cards.model';
@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})

export class CreateCardComponent  {
/*  card: Card = {
    cardId: Math.floor(Math.random() * 1000000),
    deckId: 1,
    image: "",
    question: "",
    answer: ""
  };

  wasSubmitted: boolean = false;

  constructor(
    private service: FlashcardAppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.card.deckId = params['deckId'];
    });
  }

  public onSubmit() {
    this.service.createCard(this.card).subscribe(
      () => this.wasSubmitted = true
    );
  } */
}
