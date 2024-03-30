import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDeckComponent } from './view-deck/view-deck.component';
import { ListDecksComponent } from './list-decks/list-decks.component';
import { CreateDeckComponent } from './create-deck/create-deck.component';
import { EditDeckComponent } from './edit-deck/edit-deck.component';
import { DeleteDeckComponent } from './delete-deck/delete-deck.component';
import { ViewCardComponent } from './view-card/view-card.component';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { DeleteCardComponent } from './delete-card/delete-card.component';

const routes: Routes = [
  { path: 'cards', component: ListCardsComponent },
  { path: 'cards/:cardid', component: ViewCardComponent },
  { path: 'decks/:deckid/cards', component: CreateCardComponent },
  { path: 'edit-card', component: EditCardComponent },
  { path: 'cards/search/question/:search', component: ListCardsComponent },
  { path: 'cards/:cardid', component: DeleteCardComponent },
  { path: 'decks', component: ListDecksComponent },
  { path: 'view-deck', component: ViewDeckComponent },
  { path: 'create', component: CreateDeckComponent },
  { path: 'edit-deck', component: EditDeckComponent },
  { path: 'decks/:deckid/delete', component: DeleteDeckComponent },
  { path: '**', redirectTo: 'decks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
