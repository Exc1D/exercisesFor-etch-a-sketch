const createNewGrid = document.getElementById("newGridBtn");
const clearBtn = document.getElementById("clearBtn");
const displayGridSize = document.getElementById("displayGridSize");
const sizeInput = document.getElementById("sizeInput");
const gridContainer = document.getElementById("grid");
const statusSpan = document.getElementById("drawingStatus");
const currentColorDisplay = document.getElementById("currentColor");
const colorPicker = document.getElementById("colorPicker");
const colorCode = document.getElementById("colorCode");
const colorSwatch = document.getElementById("colorSwatch");
const penBtn = document.getElementById("penBtn");
const eraserBtn = document.getElementById("eraserBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const sizeSlider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");
const sizeValue2 = document.getElementById("sizeValue2");
const totalSquares = document.getElementById("totalSquares");

// Inital state variables
let isMouseDown = false;
const DEFAULT_COLOR = "#000000";
let currentColor = DEFAULT_COLOR;
let currentTool = "pen";

// Set initial color swatch
colorSwatch.style.backgroundColor = currentColor;

console.log("Initial mousedown:", isMouseDown);
console.log("Initial tool:", currentTool);

// 1. SETUP & UTILS
function setupNewGrid() {
  const userInput = sizeInput.value;

  // Input Validation and feedback using alert for extra attitude
  if (userInput === null || userInput === "") {
    console.log("User cancelled, proceed to default grid");
    alert("Creating grid anyway...");
    createGrid(16);
  } else {
    const gridSize = parseInt(userInput);
    console.log("Type after conversion:", typeof gridSize);

    if (isNaN(gridSize)) {
      console.log("🔴 Not a number!");
      alert("Hey! That's not a number! Please enter a valid number.");
    } else if (gridSize < 2 || gridSize > 64) {
      console.log("🔴 Out of range!");
      alert("That's out of range! Just pick a number 2-64.");
    } else {
      console.log("🟢Valid input, creating grid...");
      createGrid(gridSize);
    }
  }
}

function getRandomColor() {
  // Generate a random number between 0-256
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

// 2. Create Grid based on User Input
function createGrid(size) {
  gridContainer.innerHTML = "";

  let cellSize;
  if (size <= 16) {
    cellSize = 50;
  } else if (size <= 32) {
    cellSize = 25;
  } else {
    cellSize = 600 / size; // Dynamic sizing for lage grids
  }

  gridContainer.style.gridTemplateColumns = `repeat(${size}, ${cellSizepx}`;
  console.log(`Grid colums set to: repeat(${size}, 50px)`);

  const totalCells = size * size;
  console.log(`Total cells to create: ${totalCells}`);
  displayGridSize.textContent = `Number of cells: ${totalCells}`;

  // Document fragment for performance boost
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    fragment.appendChild(cell);
  }
  gridContainer.appendChild(fragment);
  console.log("Grid creation complete!");
}

// 3. Painting logic
function paintCell(target) {
  if (typeof currentTool !== "undefined" && currentTool === "eraser") {
    target.style.backgroundColor = "white";
  } else if (typeof currentTool !== "undefined" && currentTool === "rainbow") {
    target.style.backgroundColor = getRandomColor();
  } else {
    target.style.backgroundColor = currentColor;
  }
}

// 4. Event Listeners
// Mouse event listeners to enable dragging
document.addEventListener("mousedown", () => {
  isMouseDown = true;
});
document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

// Button events
createNewGrid.addEventListener("click", setupNewGrid);

clearBtn.addEventListener("click", () => {
  console.log("CLearing grid...");

  const cells = document.querySelectorAll(".cell");

  // Add fade-out to all cells
  cells.forEach(function (cell, index) {
    // Stagger the animation slightly for wave effect
    setTimeout(function () {
      cell.style.transition = "background-color 0.3s";
      cell.style.backgroundColor = "white";
    }, index * 2); // 2ms delay per cell creates wave
  });
});

// Grid size slider
sizeSlider.addEventListener("input", () => {
  const size = parseInt(sizeSlider.value);

  sizeValue.textContent = size;
  sizeValue2.textContent = size;

  const total = size * size;
  totalSquares.textContent = `(${total} squares)`;
});

function switchTool(tool) {
  currentTool = tool;

  penBtn.classList.toggle("active", tool === "pen");
  eraserBtn.classList.toggle("active", tool === "eraser");
  rainbowBtn.classList.toggle("active", tool === "rainbow");

  console.log(`${tool} mode activated!`);
}

// Bind to tool-btn to run swtich with parameters
penBtn.addEventListener("click", () => {
  switchTool("pen");
});
eraserBtn.addEventListener("click", () => {
  switchTool("eraser");
});
rainbowBtn.addEventListener("click", () => {
  switchTool("rainbow");
});

// Color picker to change cell background
colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
  colorCode.textContent = currentColor;
  colorSwatch.style.backgroundColor = currentColor;
  console.log("Color changed to:", currentColor);

  if (currentTool !== "pen") switchTool("pen");
});

// 5. Grid interaction delegation
gridContainer.addEventListener("mousedown", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("cell")) {
    paintCell(e.target);
    updateStatus(true);
  }
});
gridContainer.addEventListener("mouseover", (e) => {
  e.preventDefault();
  if (isMouseDown && e.target.classList.contains("cell")) {
    paintCell(e.target);
  }
});

// Track drawing status for aditional visual feedback
function updateStatus(isDrawing) {
  statusSpan.textContent = isDrawing ? "Drawing!" : "Not Drawing";
  statusSpan.classList.toggle("active", isDrawing);
  gridContainer.classList.toggle("drawing", isDrawing);
}

gridContainer.addEventListener("mousedown", () => updateStatus(true));
document.addEventListener("mouseup", () => updateStatus(false));

// Initialize
switchTool("pen");
createGrid(16);
