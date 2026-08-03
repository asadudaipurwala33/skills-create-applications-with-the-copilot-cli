#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the four basic arithmetic
 * operations, as requested in issue #2 (Add basic arithmetic operations
 * to CLI calculator):
 *   - addition       (+, add)
 *   - subtraction    (-, sub)
 *   - multiplication (*, x, multiply)
 *   - division       (/, div)
 *
 * ...as well as extended operations:
 *   - modulo         (%, mod)
 *   - power          (^, pow)
 *   - square root    (sqrt, √) - unary, second operand is ignored
 *
 * Usage:
 *   node src/calculator.js <num1> <operator> <num2>
 *
 * Examples:
 *   node src/calculator.js 5 + 3
 *   node src/calculator.js 10 / 2
 */

/** Adds two numbers. */
function add(a, b) {
  return a + b;
}

/** Subtracts the second number from the first. */
function subtract(a, b) {
  return a - b;
}

/** Multiplies two numbers. */
function multiply(a, b) {
  return a * b;
}

/** Divides the first number by the second. Throws on division by zero. */
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

/** Returns the remainder of dividing the first number by the second. */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
}

/** Raises the first number to the power of the second. */
function power(a, b) {
  return a ** b;
}

/** Returns the square root of a number. Throws for negative numbers. */
function squareRoot(a) {
  if (a < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }
  return Math.sqrt(a);
}

// Maps supported operator symbols/aliases to their corresponding function.
const OPERATIONS = {
  '+': add,
  add: add,
  '-': subtract,
  sub: subtract,
  '*': multiply,
  x: multiply,
  multiply: multiply,
  '/': divide,
  div: divide,
  '%': modulo,
  mod: modulo,
  modulo: modulo,
  '^': power,
  pow: power,
  power: power,
  sqrt: squareRoot,
  '√': squareRoot,
};

/**
 * Performs the requested arithmetic operation on two numbers.
 * @param {number} a - First operand.
 * @param {string} operator - One of the supported operators/aliases.
 * @param {number} b - Second operand.
 * @returns {number} The result of the calculation.
 */
function calculate(a, operator, b) {
  const operation = OPERATIONS[operator];
  if (!operation) {
    throw new Error(
      `Unsupported operator "${operator}". Supported operators: + - * / % ^ sqrt`
    );
  }
  return operation(a, b);
}

/** Entry point: parses CLI arguments and prints the result. */
function main() {
  const [numOneArg, operatorArg, numTwoArg] = process.argv.slice(2);

  if (numOneArg === undefined || operatorArg === undefined || numTwoArg === undefined) {
    console.error('Usage: node src/calculator.js <num1> <operator> <num2>');
    console.error('Supported operators: + - * / % ^ sqrt (num2 is ignored for sqrt)');
    process.exit(1);
  }

  const numOne = Number(numOneArg);
  const numTwo = Number(numTwoArg);

  if (Number.isNaN(numOne) || Number.isNaN(numTwo)) {
    console.error('Error: <num1> and <num2> must be valid numbers.');
    process.exit(1);
  }

  try {
    const result = calculate(numOne, operatorArg, numTwo);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot, calculate };
