const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function isPrime(n) {
  if (n === 1) {
    return false;
  }
  for (let r = 2; r < n; r += 1) {
    if (n % r === 0) {
      return false;
    }
  }
  return true;
}

function solve(input) {
  const arr = [];
  for (let a = 0; a < input.length; a += 1) {
    arr.push(Number(input[a]));
  }

  for (let i = 1; i < input.length; i += 1) {
    if (isPrime(arr[i])) {
      console.log('Prime');
    } else {
      console.log('Composite');
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
