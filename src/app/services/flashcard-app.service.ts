import { Injectable } from '@angular/core';
import { Card } from './../models/cards.model';
import { Deck } from '../models/decks.model';
import { DeckDTO } from '../models/decksDTO.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class FlashcardAppService {
  private host = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  // Breakdown of Flashcard-App.Service.Ts
  // Purpose: This service is used to communicate with the backend API.
  
  /**
   * readDecks(callback: (decks: Deck[]) => void): void
   * The method uses the HttpClient to make a GET request to the backend API. It subscribes to
   * the response. This means that it will wait for the response from the backend API. 
   * The response is an array of decks.
   */
  public readDecks(callback: (decks: Deck[]) => void): void {
    this.http.get<Deck[]>(this.host + "/decks").subscribe((decks: Deck[]) => {
      callback(decks);
    });
  }

  public readDecksByNameSearch(search: string, callback: (decks: Deck[]) => void): void {
    let request = this.host + `/decks/search/${search}`;
    console.log('request', request);
    this.http.get<Deck[]>(request).subscribe((decks: Deck[]) => {
      console.log('have decks', decks);
      callback(decks);
    });
  }

  public readDecksByDeckId(deckId: number, callback: (decks: Deck[]) => void): void {
    let request = this.host + `/decks/${deckId}`;
    console.log('request', request);
    this.http.get<Deck[]>(request).subscribe((decks: Deck[]) => {
      console.log('have decks', decks);
      callback(decks);
    });
  }

  public readDeckByUserId(userId: number, callback: (decks: Deck[]) => void): void {
    let request = this.host + `/decks/user/${userId}`;
    console.log('request', request);
    this.http.get<Deck[]>(request).subscribe((decks: Deck[]) => {
      console.log('have decks', decks);
      callback(decks);
    });
  }

/*The purpose of the createDeck function is to send an HTTP POST request to a 
specific endpoint on the server to create a new deck. It uses the http service 
to make the request. The endpoint URL is constructed by appending "/decks" to the
 host property of the service.*/  
  public createDeck(deck: Deck, callback: () => void): void {
    this.http.post<Deck>(this.host + "/decks", deck).subscribe((data) => {
      callback();
    });
  }

  public updateDeck(deck: Deck, callback: () => void): void {
    this.http.put<Deck>(this.host + "/decks", deck).subscribe((data) => {
      callback();
    });
  }

  public deleteDeck(deckId: number, callback: () => void): void {
    this.http.delete(this.host + "/decks/" + deckId).subscribe((data) => {
      callback();
    });
  }

  public readCards(callback: (cards: Card[]) => void): void {
    this.http.get<Card[]>(this.host + "/cards").subscribe((cards: Card[]) => {
      callback(cards);
    });
  }

  public readCardsByCardId(cardId: number, callback: (cards: Card[]) => void): void {
    let request = this.host + `/cards/${cardId}`;
    console.log('request', request);
    this.http.get<Card[]>(request).subscribe((cards: Card[]) => {
      console.log('have cards', cards);
      callback(cards);
    });
  }

  public readCardsByQuestionSearch(search: string, callback: (cards: Card[]) => void): void {
    let request = this.host + `/cards/search/${search}`;
    console.log('request', request);
    this.http.get<Card[]>(request).subscribe((cards: Card[]) => {
      console.log('have cards', cards);
      callback(cards);
    });
  }

  public createCard(card: Card, index: number, deckId: number, callback: () => void): void {
    this.http.post<Card>(this.host + "/cards", {
      deckId: deckId,
      image: card.image,
      question: card.question,
      answer: card.answer
    }).subscribe((data) => {
      callback();
    });
  }

  public updateCard(card: Card, callback: () => void): void {
    this.http.put<Card>(this.host + "/cards", card).subscribe((data) => {
      callback();
    });
  }

  public deleteCard(cardId: number, callback: () => void): void {
    this.http.delete(this.host + "/cards/" + cardId).subscribe((data) => {
      callback();
    });
  }
}