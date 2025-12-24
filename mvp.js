// Declare variables
const createNewGrid = document.getElementById("newGridBtn");
const sizeInput = document.getElementById("sizeInput");
const drawingStatus = document.getElementById("drawingStatus");
const displayGridSize = document.getElementById("displayGridSize");
const gridContainer = document.getElementById("grid");

// Validate input
function setupNewGrid() {
  const userInput = sizeInput.value;

  if (userInput === null || userInput === "") {
    alert("I'll create a grid anyway.");
    createGrid(16);
  } else {
    const gridSize = parseInt(userInput);

    if (isNaN(gridSize)) {
      console.log("🔴 Not a number!");
      alert("Hey! That's not a number! Please enter a valid number.");
    } else if (gridSize < 2 || gridSize > 64) {
      console.log("🔴 Out of range!");
      alert("That's out of range! Just pick a number between 2-64.");
    } else {
      console.log("🟢Valid input, creating grid...");
      createGrid(gridSize);
    }
  }
}

createNewGrid.addEventListener("click", setupNewGrid);

// Add mouse event listeners
let isMouseDown = false;

document.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

// Create grid function
function createGrid(size) {
  // clear grid using innerHTML
  gridContainer.innerHTML = "";

  // add grid temp column repeat
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 50px)`;

  // declare total cells
  const totalCells = size * size;

  // loop cell creation and add cell class for styling
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    // add mouse events so that cells change color using mouse
    cell.addEventListener("mouseenter", () => {
      if (isMouseDown) {
        cell.style.backgrounColor = "#4caf50";
      }
    });
    cell.addEventListener("mousedown", () => {
      cell.style.backgroundColor = "#4caf50";
    });
    // append to container
    gridContainer.appendChild(cell);
  }
  console.log("Grid creation successful!");
}

// Track status
const setDrawingStatus = (drawing, statuSpan, gridContainer) => {
  statusSpan.textContent = drawing ? "Drawing!" : "Not Drawing!";
  statuSpan.classList.toggle("active", drawing);
  gridContainer.classList.toggle("active", active);
};

gridContainer.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  e.preventDefault();
  setDrawingStatus(true, statusSpan, gridContainer);
});

gridContainer.addEventListener("mouseup", () => {
  isMouseDown = false;
  e.preventDefault();
  setDrawingStatus(false, statusSpan, gridContainer);
});
