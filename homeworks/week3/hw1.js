const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function printStar(num) {
  for (let i = 1; i <= num; i += 1) {
    let s = '';
    for (let j = 1; j <= i; j += 1) {
      s += '*';
    }
    console.log(s);
  }
}

function solve(input) {
  printStar(Number(input[0]));
}

rl.on('close', () => {
  solve(lines);
});
