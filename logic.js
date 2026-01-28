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
