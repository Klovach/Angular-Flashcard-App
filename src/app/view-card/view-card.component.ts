import { Component } from '@angular/core';
import { Card } from '../models/cards.model';
import { Input } from '@angular/core';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrl: './view-card.component.css'
})

//This class is used to display the card in the view card component. It takes in a card as an input and displays the question and answer.
export class ViewCardComponent {
  // By using ! we are telling TypeScript that this property 
  // will be initialized by Angular and will not be null.
  @Input() card!: Card;
}
