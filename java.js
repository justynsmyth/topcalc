let decimal_active = false;
let first = "";
let currentOperation = "";
let operationCleanup = false;
let storedValue = '';

const currentDisplay = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".num");
const decimalButton = document.querySelector(".decimal");
const equalsButton = document.querySelector(".eq");
const operatorButtons = document.querySelectorAll(".op");
const clearEventButton = document.querySelector(".ce");
const clearButton = document.querySelector(".clear");
const storage = document.querySelector(".storageDisplay");
const btns = document.querySelectorAll(".btn");

btns.forEach((button) => {
    button.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            // tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
            // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
            event.preventDefault();
        }
    });
});


// 1. Obtain A
// 2. Press operator to obtain operation
// 3. Obtain B
// 4. Call operate()

// Press buttons on screen and present on display
digitButtons.forEach((button) => {
  button.addEventListener("click", () => appendDigit(button.textContent));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => evaluate(button.textContent));
});
clearEventButton.addEventListener("click", removeDigit);
clearButton.addEventListener("click",  resetDisplay);
decimalButton.addEventListener("click", addDecimal);
window.addEventListener("keydown", keyboardInput);
equalsButton.addEventListener("click", attemptEval);

function evaluate(e) {
  first = currentDisplay.textContent;
  currentOperation = e;
  storage.textContent = `${first} ${currentOperation}`;
  operationCleanup = true;
}

function attemptEval() {
    if (first === '' || currentOperation === '') {
        return;
    }
    storage.textContent += ` ${currentDisplay.textContent} = `;
    currentDisplay.textContent = operate(currentOperation, first, currentDisplay.textContent);
    first = '';
    currentOperation = '';
    operationCleanup = true; // this will make it so any new input will reset display for new calculations
}

function convertOperation(o) {
    switch(o) {
        case '/':
            return '÷';
        case '*':
            return 'x';
        default:
            return o;
    }
}


function keyboardInput(e) {
  if (e.key >= 0 || e.key < 9) {
    appendDigit(e.key);
  } else if (e.key === ".") {
    addDecimal();
  } else if (e.key === "Backspace") {
    removeDigit();
  } else if (e.key === "Escape") {
    resetDisplay();
  } else if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
    evaluate(convertOperation(e.key));
  } else if (e.key === '=' || e.key === 'Enter') {
    attemptEval(currentOperation, first, currentDisplay.textContent);
  }
}

function addDecimal() {
  appendDigit(".");
  decimal_active = true;
}

function appendDigit(num) {
    if (operationCleanup) {
        currentDisplay.textContent = "";
        operationCleanup = false;
    }
  if (currentDisplay.textContent === "0" && num != ".") {
    currentDisplay.textContent = "";
  } else if (num == "." && decimal_active) {
    return;
  } else if (num === "0" && currentDisplay.textContent === "0") {
    return;
  }
  currentDisplay.textContent += num;
}

function removeDigit() {
  if (currentDisplay.textContent.endsWith(".")) {
    decimal_active = false;
  }
  currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
}

function resetBaseDisplay() {
  currentDisplay.textContent = '0';
}

function resetDisplay() {
  resetBaseDisplay();
  storage.textContent = "";
  first = "";
  currentOperation = '';
  operationCleanup = false;
}

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function div(a, b) {
  return a / b;
}

function mult(a, b) {
  return a * b;
}

function operate(operation, a, b) {
  a = +a;
  b = +b;
  switch (operation) {
    case "+":
      return add(a, b);
    case "-":
      return sub(a, b);
    case "x":
      return mult(a, b);
    case "÷":
      return div(a, b);
    default:
      return null;
  }
}
