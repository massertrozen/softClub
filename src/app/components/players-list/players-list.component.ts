import { Input, Component, OnInit } from '@angular/core';
import { Player } from '../../models/player'; // prefer to use object for each user;
import { Game } from '../../models/game'; // prefer to use object for game properties;
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {
  @Input() players: Player[]; // pass array of all player throw the components;
  isAlreadyAdded: boolean = true; // false -- opens add-player component on the current page;
  selectedPlayers: Player[] = []; // array of players, who will play the game;
  game: Game = { type: 0, players: [], history: [] }; // type: 301/501, history: array of moves foreach player;

  constructor(private router: Router) { }

  // good practice to use initilization in this life-cycle method;
  ngOnInit() {
    // use () => {} funcs to access class vars/methods;
    $(document).ready(() => {
      // if user clicks `tr` in table, add/remove selected user from array selectedPlayers
      // and mark `tr` as selected;
      $(".all-players tr").click((event) => {
        this.toggleSelectedUser(event.currentTarget);
      });

      // if user clicks `circle`, change type of the game (301/501)
      // and mark `circle` as selected;
      $(".circle").click((event) => {
        $(".circle").removeClass("selected");
        $(event.currentTarget).addClass("selected");

        this.game.type = parseInt($(event.currentTarget).text(), 10);

        console.log(this.game);
      });

      // if user typed nickname and submit it, add/remove selected user from array selectedPlayers
      // and clear the search input value;
      $(".search-nickname").submit((event) => {
        event.preventDefault();
        let nickname = $(".main-input.search").val();

        let tr = this.findElementByText(nickname);
        this.toggleSelectedUser(tr);
        $(".main-input.search").val("");
      });
    });
  }

  // if user clicks `x` in table, selected player removes from array of all players;
  deletePlayer(player) {
    this.players.splice(this.players.indexOf(player), 1);
  }

  // switches the boolean, thats allow to open add-player/players-list component;
  goAddPlayer() {
    this.isAlreadyAdded = !this.isAlreadyAdded;
  }

  // if game type is selected and game has >= 2 players, go to play;
  goGame() {
    if (this.game.type > 0 && this.game.players.length > 1)
      this.router.navigate(['/game']);
  }

  // allows to remove object from array of objects by key and its value;
  removeItem(collection, key, value) {
    if (value == undefined || key == undefined)
      return;
  
    for (var i in collection) {
      if (collection[i][key] == value) {
        collection.splice(i, 1);
        break;
      }
    }
  };

  // allows to find `tr` in .all-players table by nickname in it;
  findElementByText(text) {
    return $(".all-players td:contains('"+ text +"')").filter(
      function() {
        $(".all-players td")
        .text()
        .trim()
        .indexOf(text.trim()) >= 0;
      }
    ).prevObject.parent();
  }

  // remove/add player to array of selectedPlayers
  // and marks/unmarks its `tr` as selected;
  toggleSelectedUser(tr) {
    $(tr).toggleClass("selected");

    let nickname = $(tr).find("td:nth-child(1)").text();
    let email = $(tr).find("td:nth-child(2)").text();
    let player = { nickname, email }
    
    if ($(tr).hasClass("selected"))
      this.selectedPlayers.unshift(player);
    else {
      this.removeItem(this.selectedPlayers, "nickname", player.nickname);
    }          

    this.game.players = this.selectedPlayers;
  }
}