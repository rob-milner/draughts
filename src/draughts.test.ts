import { Direction, input, newBoard, newPieces, validMoves } from "./draughts";

describe("draughts", () => {
  describe("newBoard", () => {
    it("should have the correct size", () => {
      const board = newBoard(8);
      expect(board.length).toBe(64);
    });

    it("should place the pieces in the correct location", () => {
      const board = newBoard(8);
      expect(board).toEqual([
        0, 1, 0, 2, 0, 3, 0, 4, 5, 0, 6, 0, 7, 0, 8, 0, 0, 9, 0, 10, 0, 11, 0,
        12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 14, 0, 15, 0,
        16, 0, 0, 17, 0, 18, 0, 19, 0, 20, 21, 0, 22, 0, 23, 0, 24, 0,
      ]);
    });
  });

  describe("newPieces", () => {
    it("should initialise the pieces", () => {
      const pieces = newPieces();
      expect(pieces.length).toBe(24);
      expect(pieces.map((p) => p.id)).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24,
      ]);
    });
  });

  describe("input", () => {
    it("when nothing is selected, clicking an occupied square should select that piece", () => {
      const state = { selected: null, board: [1], pieces: [], boardSize: 8 };
      const result = input(0, state);
      expect(result.selected).toStrictEqual({ id: 1, index: 0 });
    });

    it("when nothing is selected, clicking an empty square should do nothing", () => {
      const state = { selected: null, board: [1, 0], pieces: [], boardSize: 8 };
      const result = input(1, state);
      expect(result).toStrictEqual(state);
    });

    it("when a piece is selected, clicking a different occupied square should select that piece", () => {
      const state = {
        selected: { id: 1, index: 0 },
        board: [1, 2],
        pieces: [],
        boardSize: 8,
      };
      const result = input(1, state);
      expect(result.selected).toStrictEqual({ id: 2, index: 1 });
    });

    it("when a piece is selected, clicking on the same square should deselect the piece", () => {
      const state = {
        selected: { id: 1, index: 0 },
        board: [1],
        pieces: [],
        boardSize: 8,
      };
      const result = input(0, state);
      expect(result.selected).toBe(null);
    });

    it("when a piece is selected and an invalid empty square is clicked, the piece is deselected and the board is unchanged", () => {
      const state = {
        selected: { id: 1, index: 0 },
        board: [1, 0],
        pieces: [{ id: 1, direction: "down" as Direction, type: 1 }],
        boardSize: 8,
      };
      const result = input(1, state);
      expect(result.selected).toBe(null);
      expect(result.board).toBe(state.board);
    });

    it("when a piece is selected and an valid empty square is clicked, the piece is deselected and the board is updated", () => {
      const state = {
        selected: { id: 1, index: 0 },
        board: [1, 0, 0, 0],
        pieces: [{ id: 1, direction: "down" as Direction, type: 1 }],
        boardSize: 2,
      };
      const result = input(3, state);
      expect(result.selected).toBe(null);
      expect(result.board).toStrictEqual([0, 0, 0, 1]);
    });
  });

  describe("validMoves", () => {
    it("top-left moving down", () => {
      const result = validMoves(0, "down", 2);
      expect(result).toStrictEqual([3]);
    });

    it("top-right moving down", () => {
      const result = validMoves(1, "down", 2);
      expect(result).toStrictEqual([2]);
    });

    it("bottom-left moving up", () => {
      const result = validMoves(2, "up", 2);
      expect(result).toStrictEqual([1]);
    });

    it("bottom-right moving up", () => {
      const result = validMoves(3, "up", 2);
      expect(result).toStrictEqual([0]);
    });
  });
});
