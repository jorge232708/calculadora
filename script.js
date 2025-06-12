// script.ts
var display = document.getElementById('display');
var buttons = document.querySelectorAll('.button');
var clearButton = document.getElementById('clear');
var equalsButton = document.getElementById('equals');
var backspaceButton = document.getElementById('backspace');
var currentInput = '0';
var operator = null;
var previousInput = null;
var resetDisplay = false;
function updateDisplay() {
    display.textContent = currentInput;
}
function handleNumberClick(value) {
    if (resetDisplay) {
        currentInput = value;
        resetDisplay = false;
    }
    else {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        }
        else {
            currentInput += value;
        }
    }
    updateDisplay();
}
function handleOperatorClick(op) {
    if (previousInput === null) {
        previousInput = currentInput;
        operator = op;
        resetDisplay = true;
    }
    else if (operator && !resetDisplay) {
        // If there's a pending operation and a new number has been entered, calculate
        handleEqualsClick();
        previousInput = currentInput;
        operator = op;
        resetDisplay = true;
    }
    else {
        // If an operator is pressed consecutively, just update the operator
        operator = op;
        resetDisplay = true;
    }
}
function handleEqualsClick() {
    if (previousInput === null || operator === null) {
        return; // Nothing to calculate
    }
    var result = 0;
    var prevNum = parseFloat(previousInput);
    var currentNum = parseFloat(currentInput);
    if (isNaN(prevNum) || isNaN(currentNum)) {
        display.textContent = 'Error';
        currentInput = '0';
        previousInput = null;
        operator = null;
        resetDisplay = true;
        return;
    }
    switch (operator) {
        case '+':
            result = prevNum + currentNum;
            break;
        case '-':
            result = prevNum - currentNum;
            break;
        case '*':
            result = prevNum * currentNum;
            break;
        case '/':
            if (currentNum === 0) {
                display.textContent = 'Error: Div by 0';
                currentInput = '0';
                previousInput = null;
                operator = null;
                resetDisplay = true;
                return;
            }
            result = prevNum / currentNum;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    updateDisplay();
    previousInput = null;
    operator = null;
    resetDisplay = true;
}
function handleClearClick() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    resetDisplay = false;
    updateDisplay();
}
function handleBackspaceClick() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    }
    else {
        currentInput = '0';
    }
    updateDisplay();
}
buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        var value = button.dataset.value;
        if (value) {
            if (button.classList.contains('number') || value === '.') {
                handleNumberClick(value);
            }
            else if (button.classList.contains('operator')) {
                handleOperatorClick(value);
            }
        }
    });
});
clearButton.addEventListener('click', handleClearClick);
equalsButton.addEventListener('click', handleEqualsClick);
backspaceButton.addEventListener('click', handleBackspaceClick);
// Initial display update
updateDisplay();
