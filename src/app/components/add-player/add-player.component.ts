import { Input, Component } from '@angular/core';
import { Player } from 'src/app/models/player'; // prefer to use object for each user;

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})

export class AddPlayerComponent {
  @Input() players: Player[] = []; // pass array of all player throw the components;
  isAlreadyAdded: boolean = false; // true -- opens players-list component on the current page;

  constructor() { }

  // adds player`s object to array of players
  // and allows to see the players-list component on the current page;
  addPlayer(nickname, email) {
    this.players.unshift({ nickname, email });
    this.isAlreadyAdded = !this.isAlreadyAdded;

    return false; // helps not to refresh the page after form submiting;
  }
}
