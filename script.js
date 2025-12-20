const container = document.getElementById("grid");

const gridSize = 4;
const totalCells = gridSize * gridSize;

for (let i = 0; i < totalCells; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.textContent = i + 1;
  container.appendChild(cell);
}
