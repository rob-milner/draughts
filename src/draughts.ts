export const numPieces = 24;

type Piece = {
  type: number;
  id: number;
  direction: Direction;
};

type GameState = {
  selected: SelectedPiece;
  board: number[];
  pieces: Piece[];
  boardSize: number;
};

type SelectedPiece = {
  id: number;
  index: number;
};

export type Direction = "up" | "down" | "all";

const printBoard = (board: number[], boardSize: number) => {
  let rows: string[] = [];
  for (let y = 0; y < boardSize; y++) {
    rows.push(
      board
        .slice(y * 8, y * 8 + 8)
        .map((x) => x.toString().padStart(2, "0"))
        .join(" ")
    );
  }
  console.log(rows);
};

export const newBoard = (boardSize: number): number[] => {
  const board = new Array(boardSize * boardSize).fill(0);
  let piece = 1;
  for (let i = 1; i < boardSize; i += 2) {
    board[i] = piece;
    board[i + 7] = piece + 4;
    board[i + 16] = piece + 8;
    board[i + 39] = piece + 12;
    board[i + 48] = piece + 16;
    board[i + 55] = piece + 20;
    piece++;
  }

  return board;
};

export const newPieces = (): Piece[] => {
  const pieces: Piece[] = [];
  for (let i = 1; i <= 12; i++) {
    pieces.push({ type: 1, id: i, direction: "down" });
  }
  for (let i = 13; i <= 24; i++) {
    pieces.push({ type: 2, id: i, direction: "up" });
  }
  return pieces;
};

export const input = (index: number, state: GameState): GameState => {
  const { board, pieces, boardSize } = state;
  let selected = state.selected;

  if (board[index]) {
    selected = index === selected?.index ? null : { id: board[index], index };
    return { ...state, selected };
  }

  if (selected === null) {
    return state;
  }

  const { direction } = pieces[board[index]];

  if (validMoves(selected.index, direction, boardSize).includes(index)) {
    board[selected.index] = 0;
    board[index] = selected.id;
  }

  selected = null;

  return { ...state, board, selected, pieces };
};

export const validMoves = (
  from: number,
  direction: Direction,
  boardSize: number
): number[] => {
  let valid: number[] = [];
  if (from % boardSize === 0) {
    switch (direction) {
      case "down":
        valid.push(from + boardSize + 1);
        break;
      case "up":
        valid.push(from - boardSize + 1);
        break;
    }
  } else if (from % boardSize === boardSize - 1) {
    switch (direction) {
      case "down":
        valid.push(from + boardSize - 1);
        break;
      case "up":
        valid.push(from - boardSize - 1);
        break;
    }
  }
  return valid;
};
