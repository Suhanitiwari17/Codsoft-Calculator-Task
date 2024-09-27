// Get necessary elements from the DOM
const inputDisplay = document.getElementById('input');
const buttons = document.querySelectorAll('#one, #two');
const deleteButton = document.getElementById('del');

// Variables to store input and operator values
let currentInput = '';
let previousInput = '';
let operation = '';
let result = '';

// Function to update the display
function updateDisplay(value) {
    inputDisplay.textContent = value;
}

// Function to handle number input
function handleNumberInput(number) {
    if (result) {
        currentInput = number;  // Reset input after result
        result = '';
    } else {
        currentInput += number;  // Append number to current input
    }
    updateDisplay(currentInput);
}

// Function to handle operator input
function handleOperatorInput(operator) {
    if (currentInput === '') return;  // Ignore if no input

    if (previousInput && operation) {
        calculate();  // Perform previous operation before continuing
    }

    operation = operator;  // Store the operator
    previousInput = currentInput;  // Save the current input as previous
    currentInput = '';  // Clear current input for next number
}

// Function to perform the calculation
function calculate() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    if (isNaN(num1) || isNaN(num2)) return;  // Ensure valid inputs

    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        default:
            return;
    }

    updateDisplay(result);  // Show the result
    previousInput = result;  // Save result for further calculation
    currentInput = '';  // Reset current input
}

// Function to handle equals
function handleEquals() {
    if (!currentInput || !previousInput || !operation) return;  // Ensure inputs and operator exist
    calculate();
    operation = '';  // Clear operation after calculation
}

// Function to handle backspace (delete)
function handleDelete() {
    currentInput = currentInput.slice(0, -1);  // Remove last character
    updateDisplay(currentInput || '0');  // Show remaining input or 0 if empty
}

// Event listeners for button clicks
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;

        if (!isNaN(value)) {  // If the value is a number
            handleNumberInput(value);
        } else if (value === '+' || value === '-') {
            handleOperatorInput(value);
        } else if (value === '=') {
            handleEquals();
        }
    });
});

// Event listener for delete button (backspace)
deleteButton.addEventListener('click', handleDelete);
