import { input, newBoard, newPieces, numPieces } from "./draughts";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const { width, height } = canvas;

let gameState = {
  board: newBoard(8),
  selected: null,
  pieces: newPieces(),
  boardSize: 8,
};

const drawSquare = (i: number, boardSize: number) => {
  const x = ((i * width) / boardSize) % width;
  const y = (Math.floor(i / boardSize) * height) / boardSize;
  const w = width / boardSize;
  const h = width / boardSize;
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, w, h);
};

const drawPiece = (i: number) => {
  const { selected, boardSize } = gameState;
  ctx.fillStyle = "red";
  const offset = width / boardSize / 2;
  const x = (((i * width) / boardSize) % width) + offset;
  const y = (Math.floor(i / boardSize) * height) / boardSize + offset;
  const w = width / boardSize;
  const h = width / boardSize;
  const radius = (width / boardSize) * 0.4;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  if (selected?.index === i) {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(x, y, radius / 2, 0, 2 * Math.PI);
    ctx.fill();
  }
};

const drawBoard = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  const { board, boardSize } = gameState;

  for (let i = 0; i < boardSize * boardSize; i++) {
    const draw = ((Math.floor(i / boardSize) % 2) + i) % 2 === 0;
    if (draw) {
      drawSquare(i, boardSize);
    }
    if (board[i]) {
      drawPiece(i);
    }
  }
};

canvas.addEventListener("click", (e) => {
  const { boardSize } = gameState;
  const rect = canvas.getBoundingClientRect();
  const w = rect.width / boardSize;
  const x = Math.floor((e.clientX - rect.left) / w);
  const y = Math.floor((e.clientY - rect.top) / w);

  const index = y * boardSize + x;
  gameState = input(index, gameState);
  drawBoard();
});

drawBoard();
