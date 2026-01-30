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
    case '⌫':
      handleBackspacePressed();
      break;
  }
}
const calculator = document.querySelector('div.calculator');
const numberDisplay = calculator.querySelector('input.number-display');
calculator.addEventListener('click', handleClick);

function getIfOneNumberPresent(expression) {
  if (expression === '') return 0;
  const regex = /^-?[0-9]+(\.[0-9]+)?$/g;
  if (regex.test(expression)) {
    return new Number(expression);
  }
  return 'ERROR';
}
function getIfExpressionPresent(expression) {
  const regex = /^-?[0-9]+(\.[0-9]+)?(\+|-|\*|\/)[0-9]+(\.[0-9]+)?$/g;

  if (!regex.test(expression)) {
    return { result: 'Error' };
  }
  const leftNumberRegex = /^-?[0-9]+(\.[0-9]+)?/g;
  const rightNumberRegex = /[0-9]+(\.[0-9]+)?$/g;

  const operatorRegex = /(?<!^)(\+|-|\*|\/)/g;

  const returnObject = { result: 'Success' };
  returnObject.leftOperand = expression.match(leftNumberRegex)[0];
  returnObject.rightOperand = expression.match(rightNumberRegex)[0];
  returnObject.operator = operatorRegex.exec(expression)[0];
  return returnObject;
}
function handleNumberPressed(number) {
  if (numberDisplay.value === '0') {
    numberDisplay.value = number;
    return;
  }
  numberDisplay.value += number;
}
function handleCLEARPressed() {
  numberDisplay.value = '';
}
function handleBackspacePressed() {
  if (numberDisplay.value.length < 1) return;
  else if (
    numberDisplay.value.startsWith('ERROR') ||
    numberDisplay.value.startsWith('NaN') ||
    numberDisplay.value === 'Infinity'
  ) {
    numberDisplay.value = '';
    return;
  }
  numberDisplay.value = numberDisplay.value.substring(0, numberDisplay.value.length - 1);
}
function handleOperatorPressed(operator) {
  if ('+-*/'.includes(numberDisplay.value[numberDisplay.value.length - 1])) {
    const end = numberDisplay.value.length - 1;
    const newString = numberDisplay.value.substring(0, end) + operator;

    numberDisplay.value = newString;
    return;
  }
  handleEqualsPressed();
  numberDisplay.value += operator;
}
function handleDotPressed(dot) {
  if (dot === '.') numberDisplay.value += '.';
}
function handleConstantPressed(constant) {
  if (constant === 'e') numberDisplay.value += '2.71828';
}
function handleEqualsPressed() {
  const expression = numberDisplay.value;
  if (expression === '') {
    numberDisplay.value = '0';
    return;
  }
  const parseExpression = getIfExpressionPresent(expression);

  if (parseExpression.result === 'Success') {
    const value = calcSingleOperation(
      parseExpression.leftOperand,
      parseExpression.operator,
      parseExpression.rightOperand,
    );
    numberDisplay.value = value;
    return;
  }
  const number = getIfOneNumberPresent(expression);
  numberDisplay.value = number;
}
