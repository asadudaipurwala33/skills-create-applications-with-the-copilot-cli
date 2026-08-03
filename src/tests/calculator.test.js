/**
 * calculator.test.js
 *
 * Unit tests for the calculator functions in src/calculator.js, covering
 * the four basic arithmetic operations (addition, subtraction,
 * multiplication, division) as well as edge cases such as division by
 * zero, negative numbers, decimals, and the generic `calculate` dispatcher.
 *
 * Test framework: Jest.
 */

const { add, subtract, multiply, divide, calculate } = require('../calculator');

describe('add', () => {
  // Example from images/calc-basic-operations.png: 2 + 3
  test('adds two positive numbers (2 + 3 = 5)', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds a negative and a positive number', () => {
    expect(add(-5, 3)).toBe(-2);
  });

  test('adds two negative numbers', () => {
    expect(add(-4, -6)).toBe(-10);
  });

  test('adds zero to a number', () => {
    expect(add(7, 0)).toBe(7);
  });

  test('adds decimal numbers', () => {
    expect(add(1.5, 2.25)).toBeCloseTo(3.75);
  });
});

describe('subtract', () => {
  // Example from images/calc-basic-operations.png: 10 - 4
  test('subtracts two positive numbers (10 - 4 = 6)', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('subtracts a larger number from a smaller number (negative result)', () => {
    expect(subtract(10, 20)).toBe(-10);
  });

  test('subtracts negative numbers', () => {
    expect(subtract(-5, -3)).toBe(-2);
  });

  test('subtracts zero from a number', () => {
    expect(subtract(9, 0)).toBe(9);
  });

  test('subtracts decimal numbers', () => {
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });
});

describe('multiply', () => {
  // Example from images/calc-basic-operations.png: 45 * 2
  test('multiplies two positive numbers (45 * 2 = 90)', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('multiplies a positive number by a negative number', () => {
    expect(multiply(10, -20)).toBe(-200);
  });

  test('multiplies two negative numbers (result is positive)', () => {
    expect(multiply(-4, -5)).toBe(20);
  });

  test('multiplies by zero', () => {
    expect(multiply(123, 0)).toBe(0);
  });

  test('multiplies decimal numbers', () => {
    expect(multiply(1.5, 2)).toBeCloseTo(3);
  });
});

describe('divide', () => {
  // Example from images/calc-basic-operations.png: 20 / 5
  test('divides two positive numbers (20 / 5 = 4)', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('divides a negative number by a positive number', () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  test('divides two negative numbers (result is positive)', () => {
    expect(divide(-9, -3)).toBe(3);
  });

  test('divides decimal numbers', () => {
    expect(divide(7.5, 2.5)).toBeCloseTo(3);
  });

  test('throws an error when dividing by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero is not allowed.');
  });

  test('throws an error when dividing zero by zero', () => {
    expect(() => divide(0, 0)).toThrow('Division by zero is not allowed.');
  });
});

describe('calculate', () => {
  test('dispatches addition via "+" operator', () => {
    expect(calculate(2, '+', 3)).toBe(5);
  });

  test('dispatches addition via "add" alias', () => {
    expect(calculate(2, 'add', 3)).toBe(5);
  });

  test('dispatches subtraction via "-" operator', () => {
    expect(calculate(10, '-', 4)).toBe(6);
  });

  test('dispatches subtraction via "sub" alias', () => {
    expect(calculate(10, 'sub', 4)).toBe(6);
  });

  test('dispatches multiplication via "*" operator', () => {
    expect(calculate(45, '*', 2)).toBe(90);
  });

  test('dispatches multiplication via "x" alias', () => {
    expect(calculate(45, 'x', 2)).toBe(90);
  });

  test('dispatches multiplication via "multiply" alias', () => {
    expect(calculate(45, 'multiply', 2)).toBe(90);
  });

  test('dispatches division via "/" operator', () => {
    expect(calculate(20, '/', 5)).toBe(4);
  });

  test('dispatches division via "div" alias', () => {
    expect(calculate(20, 'div', 5)).toBe(4);
  });

  test('throws an error for an unsupported operator', () => {
    expect(() => calculate(1, '%', 2)).toThrow(
      'Unsupported operator "%". Supported operators: + - * /'
    );
  });

  test('propagates division-by-zero error through calculate', () => {
    expect(() => calculate(5, '/', 0)).toThrow('Division by zero is not allowed.');
  });
});
