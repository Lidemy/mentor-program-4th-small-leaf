const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function digitCount(n) {
  if (n === 0) return 1;
  let result = 0;
  while (n !== 0) {
    let m = n;
    m = Math.floor(m / 10);
    result += 1;
  }
  return result;
}

function Narcissistic(n) {
  let m = n;
  const digit = digitCount(n);
  let sum = 0;
  while (m !== 0) {
    const num = m % 10;
    sum += num ** digit;
    m = Math.floor(m / 10);
  }
  if (sum === n) {
    return true;
  }
  if (sum !== n) {
    return false;
  }
}

function solve(input) {
  const line = input[0].split(' ');
  const n = Number(line[0]);
  const m = Number(line[1]);
  let i;
  for (i = n; i <= m; i += 1) {
    if (Narcissistic(i)) {
      console.log(i);
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
