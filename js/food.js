import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

export const EXPANSION_RATE = 2;
let foodPositions = [randomFoodPosition()];

export function update() {
  if (onSnake(foodPositions[0])) {
    expandSnake(EXPANSION_RATE);
    // foodPosition.shift();
    // foodPositions.push(randomFoodPosition());
    foodPositions = [randomGridPosition()];
  }
}
export function draw($gameBoard) {
  foodPositions.forEach((foodPos) => {
    const $foodEl = document.createElement("div");
    $foodEl.style.gridRowStart = foodPos.y;
    $foodEl.style.gridColumnStart = foodPos.x;
    $foodEl.classList.add("food");
    $gameBoard.appendChild($foodEl);
  });
}

function randomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
