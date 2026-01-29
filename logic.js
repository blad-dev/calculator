console.log('Hello, world!');

function toNumber(value) {
  let number = Number(value);
  if (isNaN(number)) {
    throw TypeError(`operand is not a number: ${value}`);
  }
  return number;
}
function calcSingleOperation(leftOperand, operation, rightOperand) {
  leftOperand = toNumber(leftOperand);
  rightOperand = toNumber(rightOperand);

  switch (operation) {
    case '+':
      return leftOperand + rightOperand;
    case '-':
      return leftOperand - rightOperand;
    case '*':
      return leftOperand * rightOperand;
    case '/':
      return leftOperand / rightOperand;
    default:
      throw TypeError(`invalid operation: ${operation}`);
  }
}

function handleClick(event) {
  const textContent = event.target.textContent;
  // prettier-ignore
  switch(textContent){
    case '0': case '1': case '2': case '3': case '4': 
    case '5': case '6': case '7': case '8': case '9':
      handleNumberPressed(textContent);
      break;
    case '+': case '-': case '*': case '/':
      handleOperatorPressed(textContent);
      break;
    case '.':
      handleDotPressed(textContent);
      break;
    case 'e':
      handleConstantPressed(textContent);
      break;
    case '=':
      handleEqualsPressed();
      break;
    case 'CLEAR':
      handleCLEARPressed();
      break;
  }
}
const calculator = document.querySelector('div.calculator');
const numberDisplay = calculator.querySelector('input.number-display');
calculator.addEventListener('click', handleClick);
