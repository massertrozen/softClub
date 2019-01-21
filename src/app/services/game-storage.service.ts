import { Injectable } from '@angular/core';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameStorageService {
  public data: Game; // to save and pass Game object throw the pages;

  constructor() { }
}
