// script.ts

const display = document.getElementById('display') as HTMLDivElement;
const buttons = document.querySelectorAll('.button') as NodeListOf<HTMLButtonElement>;
const clearButton = document.getElementById('clear') as HTMLButtonElement;
const equalsButton = document.getElementById('equals') as HTMLButtonElement;
const backspaceButton = document.getElementById('backspace') as HTMLButtonElement;

let currentInput: string = '0';
let operator: string | null = null;
let previousInput: string | null = null;
let resetDisplay: boolean = false;

function updateDisplay(): void {
    display.textContent = currentInput;
}

function handleNumberClick(value: string): void {
    if (resetDisplay) {
        currentInput = value;
        resetDisplay = false;
    } else {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }
    updateDisplay();
}

function handleOperatorClick(op: string): void {
    if (previousInput === null) {
        previousInput = currentInput;
        operator = op;
        resetDisplay = true;
    } else if (operator && !resetDisplay) {
        // If there's a pending operation and a new number has been entered, calculate
        handleEqualsClick();
        previousInput = currentInput;
        operator = op;
        resetDisplay = true;
    } else {
        // If an operator is pressed consecutively, just update the operator
        operator = op;
        resetDisplay = true;
    }
}

function handleEqualsClick(): void {
    if (previousInput === null || operator === null) {
        return; // Nothing to calculate
    }

    let result: number = 0;
    const prevNum = parseFloat(previousInput);
    const currentNum = parseFloat(currentInput);

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

function handleClearClick(): void {
    currentInput = '0';
    operator = null;
    previousInput = null;
    resetDisplay = false;
    updateDisplay();
}

function handleBackspaceClick(): void {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        if (value) {
            if (button.classList.contains('number') || value === '.') {
                handleNumberClick(value);
            } else if (button.classList.contains('operator')) {
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