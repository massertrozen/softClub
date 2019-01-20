import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/player';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  players: Player[] = [];

  constructor() { }
  ngOnInit() { }

  addPlayer(nickname, email) {
    this.players.unshift({ 
      nickname,
      email
    });

    return false;
  }

  deletePlayer(player) {
    this.players.splice(this.players.indexOf(player), 1);
  }
}
