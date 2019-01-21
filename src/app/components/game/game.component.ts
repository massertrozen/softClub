import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameStorageService } from "src/app/services/game-storage.service";
import { Game } from 'src/app/models/game';
import * as $ from 'jquery';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  isStoped: boolean = false; // true -- means, that winner detected and game stopped;

  constructor(private router: Router, private gameStorage: GameStorageService) { }

  ngOnInit() { 
    this.game = this.gameStorage.data; // get Game object from service;

    // if we appeared on page by URL (without Game object) -- go to add-player component;
    if (this.game === undefined)
      this.router.navigate(['/']);
  }

  // decodes form.submit array 
  // and saves all player`s moves to the Game object;
  saveHistory(formData) {
    let arrayNames = [];
    let arrayValues = [];
    let arrayMoves = [];

    // makes array of nicknames
    // and array of dart values, boost values;
    $.each(formData,function() {
      let nickname = this.name.split("-")[2];      
      let value = this.value;

      arrayNames.unshift(nickname);
      arrayValues.unshift(value);      
    });

    // makes Move object for each nickname;
    for (let i = 0; i < arrayNames.length; i += 6) {
      if (i >= arrayNames.length) break;

      let step = this.game.history.length;
      let lastScore = this.game.history[0].find(x => x.nickname === arrayNames[i]).totalScore;

      let move = {
        step: step,
        nickname: arrayNames[i],
        d1Boost: Number(arrayValues[i]),
        d1Value: Number(arrayValues[i + 1]),
        d2Boost: Number(arrayValues[i + 2]),
        d2Value: Number(arrayValues[i + 3]),
        d3Boost: Number(arrayValues[i + 4]),
        d3Value: Number(arrayValues[i + 5]),
        totalScore: lastScore
      }

      // calculates current move total score;
      let score = move.d1Value * move.d1Boost + move.d2Value * move.d2Boost + move.d3Value * move.d3Boost;

      // checks, if score bust 
      // or game rules are violated,
      // the score does not decreases;
      if (move.totalScore - score < 0 ||
        move.totalScore - score === 1 ||
        (move.totalScore - score === 0 && (move.d1Boost != 2 && move.d2Boost != 2 && move.d3Boost != 2))) {

      } else {
        move.totalScore -= score;
      }

      // if game rules are not violated
      // and somebody reached score == 0
      // stopes the game and marks the winner;
      if (move.totalScore === 0) {
        this.markWinner(move.nickname);
      }

      arrayMoves.unshift(move);      
    }

    this.game.history.unshift(arrayMoves);

    // if step == 20, finds the winner and stops the game;
    if (this.game.history.length - 1 === 20) {
      let movesArray = this.game.history[0];
      let nickname;

      // find min score owner;
      for (let i = 0; i < movesArray.length; i++) {
        let min = movesArray[0].totalScore;
        nickname = movesArray[0].nickname;

        if (movesArray[i].totalScore < min) {
          min = movesArray[i].totalScore;
          nickname = movesArray[i].nickname;
        }
      }

      this.markWinner(nickname);
    }
  }

  // if game is not stoped, parse the form on submiting;
  parseData() {
    if (!this.isStoped) {
      let formData = $(".add-move").serializeArray();
      this.saveHistory(formData);
    }    

    return false; // helps not to refresh the page;
  }

  // shows alert with winner`s nickname, marks nickname in table, removes `Add` button;
  markWinner(nickname) {
    alert("winner: " + nickname);
    this.findElementByText(nickname).html(nickname + " <i class='material-icons'>accessibility_new</i>").addClass("winner");
    this.isStoped = !this.isStoped;
    $(".main-button.add").remove();
  }

  // helps to find html element by content in it;
  findElementByText(text) {
    return $(".results td:contains('"+ text +"')").filter(
      function() {
        $(".results td")
        .text()
        .trim()
        .indexOf(text.trim()) >= 0;
      }
    ).prevObject;
  }

  // redirect to add-player component;
  goNewGame() {
    this.router.navigate(['/']);
  }
}
