// Game move object;
// - - - - - - - - -
// step: counter of steps, 
// nickname: move owner nickname,
// d1Value: first dart result,
// d1Boost: first dart boost (1x/2x/3x),
// d2Value: second dart result,
// d2Boost: second dart boost (1x/2x/3x),
// d3Value: third dart result,
// d3Boost: third dart boost (1x/2x/3x),
// totalScore: result player`s score on this move;

export class Move {
    step: number;
    nickname: string;
    d1Value: number;
    d1Boost: number;
    d2Value: number;
    d2Boost: number;
    d3Value: number;
    d3Boost: number;
    totalScore: number;
}