/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  // eslint-disable-next-line no-use-before-define
  solve(lines);
});

function judge(a, b, k) {
  if (a === b) return 'DRAW';
  if (k == -1) {
    const temp = a;
    a = b;
    b = temp;
  }
  const lengthA = a.length;
  const lengthB = b.length;
  if (lengthA != lengthB) {
    return lengthA > lengthB ? 'A' : 'B';
  }
  return a > b ? 'A' : 'B';
}

function solve(input) {
  const m = Number(input[0]);
  for (let i = 1; i <= m; i += 1) {
    const [a, b, k] = input[i].split(' ');
    console.log(judge(a, b, k));
  }
}
