import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateDeckComponent } from './create-deck/create-deck.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { EditDeckComponent } from './edit-deck/edit-deck.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { DeleteCardComponent } from './delete-card/delete-card.component';
import { DeleteDeckComponent } from './delete-deck/delete-deck.component';
import { ViewDeckComponent } from './view-deck/view-deck.component';
import { ViewCardComponent } from './view-card/view-card.component';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { ListDecksComponent } from './list-decks/list-decks.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    CreateDeckComponent,
    CreateCardComponent,
    EditDeckComponent,
    EditCardComponent,
    DeleteCardComponent,
    DeleteDeckComponent,
    ViewDeckComponent,
    ViewCardComponent,
    ListCardsComponent,
    ListDecksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
