const fs = require('fs');
const bank = require('./bankTest.json')

for (var i = 0; i < bank.length; i++) {
    if (bank[i].name === 'BEAR#0454') {
      bank[i].mythrium = bank[i].mythrium - 30;
      break;
    }
  }
for (var i = 0; i < bank.length; i++) {
    if (bank[i].name === 'BlakstarSoldier#2568') {
      bank[i].mythrium = bank[i].mythrium + 30;
      break;
    }
  }
console.log(bank[0].mythrium)
console.log(bank[1].mythrium)
fs.writeFileSync('bankTest.json', JSON.stringify(bank))