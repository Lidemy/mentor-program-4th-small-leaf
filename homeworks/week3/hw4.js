const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function reverse(str) {
  let nstr = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    nstr += str[i];
  }
  if (nstr === str) {
    return true;
  }
  return false;
}

function solve(input) {
  const str = input[0];
  if (reverse(str)) {
    console.log('True');
  } else {
    console.log('False');
  }
}

rl.on('close', () => {
  solve(lines);
});
