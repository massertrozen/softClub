import { Player } from 'src/app/models/player';
import { Move } from 'src/app/models/move';

// Game object;
// - - - - - - - - -
// type: 301/501, 
// players: array of player`s object,
// history: array of all players moves on each step storage;
export class Game {
    type: number;
    players: Player[];
    history: Move[][];
}