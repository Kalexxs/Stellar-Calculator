const display = document.getElementById("display");
let currentInput = "0";

function updateDisplay() {
  display.value = currentInput;
}

function appendNumber(num) {
  if (currentInput === "0" || currentInput === "Error") {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  updateDisplay();
}

function deleteLastChar() {
  if (currentInput.length > 1 && currentInput !== "Error") {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateDisplay();
}

function handleOperation(op) {
  if (/[+\-*/]$/.test(currentInput)) return;
  currentInput += op;
  updateDisplay();
}

function calculateResult() {
  try {
    const result = eval(currentInput.replace(/×/g, "*").replace(/÷/g, "/"));
    currentInput = isFinite(result) ? String(result) : "Error";
  } catch {
    currentInput = "Error";
  }
  updateDisplay();
}

function createStars() {
  const colors = ["#ffffff", "#ffe08c", "#a2d2ff"];

  for (let i = 0; i < 25; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 4 + 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `-10px`;

    star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    star.style.animationDuration = `${Math.random() * 3 + 3}s`;

    document.body.appendChild(star);

    star.addEventListener("animationend", () => {
      star.remove();
    });
  }
}

const starButton = document.querySelector('button[aria-label="star"]');

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
  starButton.addEventListener('click', function() {
    this.style.transform = 'rotate(15deg)'; 
    setTimeout(() => {
      this.style.transform = 'rotate(0deg)'; 
    }, 300); 
  });
} else {
  starButton.addEventListener('mouseenter', function() {
    this.style.transform = 'rotate(15deg)';
  });
  starButton.addEventListener('mouseleave', function() {
    this.style.transform = 'rotate(0deg)';
  });
}

updateDisplay();
