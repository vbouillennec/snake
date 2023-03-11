import { getInputDirection } from "./input.js";
export const SNAKE_SPEED = 5;
const snakeBody = [
  { x: 9, y: 11 },
  { x: 8, y: 11 },
  { x: 7, y: 11 },
];
let newBodyParts = 0;

export function update() {
  addBodyParts(newBodyParts);
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}
export function draw($gameBoard) {
  snakeBody.forEach((bodyPart) => {
    const $snakeEl = document.createElement("div");
    $snakeEl.style.gridRowStart = bodyPart.y;
    $snakeEl.style.gridColumnStart = bodyPart.x;
    $snakeEl.classList.add("snake");
    $gameBoard.appendChild($snakeEl);
  });
}

export function expandSnake(expansion) {
  newBodyParts += expansion;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((bodyPart, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(bodyPart, position);
  });
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addBodyParts() {
  for (let i = 0; i < newBodyParts; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newBodyParts = 0;
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}
