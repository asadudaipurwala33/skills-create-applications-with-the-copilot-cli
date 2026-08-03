#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting basic arithmetic operations,
 * as requested in issue #2 (Add basic arithmetic operations to CLI calculator):
 *   - addition       (+, add)
 *   - subtraction    (-, sub)
 *   - multiplication (*, x, multiply)
 *   - division       (/, div)
 *   - modulo         (%, mod)
 *   - exponentiation (**, ^, pow)
 *   - square root    (sqrt)   — unary: only one operand required
 *
 * Usage:
 *   node src/calculator.js <num1> <operator> <num2>
 *   node src/calculator.js <num1> sqrt
 *
 * Examples:
 *   node src/calculator.js 5 + 3
 *   node src/calculator.js 10 / 2
 *   node src/calculator.js 10 % 3
 *   node src/calculator.js 2 ** 8
 *   node src/calculator.js 9 sqrt
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

/** Returns the remainder of dividing the first number by the second. Throws on modulo by zero. */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
}

/** Raises the first number to the power of the second. */
function power(a, b) {
  return Math.pow(a, b);
}

/** Returns the square root of a number. Throws if the number is negative. */
function squareRoot(a) {
  if (a < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }
  return Math.sqrt(a);
}

// Maps supported binary operator symbols/aliases to their corresponding function.
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
  '**': power,
  '^': power,
  pow: power,
};

/**
 * Performs the requested arithmetic operation on one or two numbers.
 * @param {number} a - First operand.
 * @param {string} operator - One of the supported operators/aliases.
 * @param {number} [b] - Second operand (not required for unary operators like sqrt).
 * @returns {number} The result of the calculation.
 */
function calculate(a, operator, b) {
  // Handle unary operators (square root requires only one operand).
  if (operator === 'sqrt') {
    return squareRoot(a);
  }
  const operation = OPERATIONS[operator];
  if (!operation) {
    throw new Error(
      `Unsupported operator "${operator}". Supported operators: + - * / % ** sqrt`
    );
  }
  return operation(a, b);
}

/** Entry point: parses CLI arguments and prints the result. */
function main() {
  const [numOneArg, operatorArg, numTwoArg] = process.argv.slice(2);

  // Both the first number and the operator are always required.
  if (numOneArg === undefined || operatorArg === undefined) {
    console.error('Usage: node src/calculator.js <num1> <operator> [<num2>]');
    console.error('       node src/calculator.js <num1> sqrt');
    console.error('Supported operators: + - * / % ** sqrt');
    process.exit(1);
  }

  const UNARY_OPERATORS = ['sqrt'];
  const isUnary = UNARY_OPERATORS.includes(operatorArg);

  // For binary operators, the second number is also required.
  if (!isUnary && numTwoArg === undefined) {
    console.error('Usage: node src/calculator.js <num1> <operator> <num2>');
    console.error('Supported operators: + - * / % ** sqrt');
    process.exit(1);
  }

  const numOne = Number(numOneArg);

  if (Number.isNaN(numOne)) {
    console.error('Error: <num1> must be a valid number.');
    process.exit(1);
  }

  let numTwo;
  if (!isUnary) {
    numTwo = Number(numTwoArg);
    if (Number.isNaN(numTwo)) {
      console.error('Error: <num2> must be a valid number.');
      process.exit(1);
    }
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
