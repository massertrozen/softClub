import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { GameComponent } from './components/game/game.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [ AppComponent, AddPlayerComponent, PlayersListComponent, GameComponent, NotFoundComponent, ],
  imports: [ BrowserModule, AppRoutingModule ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
