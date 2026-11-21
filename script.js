const display = document.getElementById("display");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

let currentInput = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

function updateDisplay() {
    display.value = currentInput;
}

numberButtons.forEach(button => {
    button.addEventListener("click", function () {
        const number = button.dataset.number;

        if (waitingForSecondNumber) {
            currentInput = number === "." ? "0." : number;
            waitingForSecondNumber = false;
        } else {
            if (number === "." && currentInput.includes(".")) return;

            if (currentInput === "0" && number !== ".") {
                currentInput = number;
            } else {
                currentInput += number;
            }
        }

        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", function () {
        const selectedOperator = button.dataset.operator;

        if (operator && !waitingForSecondNumber) {
            calculate();
        }

        firstNumber = parseFloat(currentInput);
        operator = selectedOperator;
        waitingForSecondNumber = true;
    });
});

function calculate() {
    const secondNumber = parseFloat(currentInput);
    let result;

    if (operator === "+") {
        result = firstNumber + secondNumber;
    } else if (operator === "-") {
        result = firstNumber - secondNumber;
    } else if (operator === "*") {
        result = firstNumber * secondNumber;
    } else if (operator === "/") {
        if (secondNumber === 0) {
            currentInput = "Cannot divide by zero";
            firstNumber = null;
            operator = null;
            waitingForSecondNumber = true;
            updateDisplay();
            return;
        }
        result = firstNumber / secondNumber;
    }

    currentInput = String(parseFloat(result.toFixed(10)));
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;
    updateDisplay();
}

equalsButton.addEventListener("click", function () {
    if (operator !== null && firstNumber !== null) {
        calculate();
    }
});

clearButton.addEventListener("click", function () {
    currentInput = "0";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay();
});

updateDisplay();
