const fs = require('node:fs');
const bnk = require('../bank.json')

function findUsers(user1, user2){
  var user1Position;
  var user2Position;
  for (var i = 0; i < bnk.length; i++){
    if (bnk[i].name === user1) {
      user1Position = i;
      break;
    }
  }
  for (var i = 0; i < bnk.length; i++){
    if (bnk[i].name === user2) {
      user2Position = i;
      break;
    }
  }
  return [user1Position, user2Position];
};

function transfer(payer, payeeUser, payment, reason, interactionTime){
  const bank = JSON.parse(fs.readFileSync('./bank.json', 'utf8'));
	const users = findUsers(payer.tag, payeeUser.tag)
    if (bank[users[0]].mythrium >= payment) {
      bank[users[0]].mythrium = bank[users[0]].mythrium - +payment;
      bank[users[0]].transactions = bank[users[0]].transactions + 1;
      bank[users[0]].transactionAmount = bank[users[0]].transactionAmount + +payment;
      bank[users[1]].mythrium = bank[users[1]].mythrium + +payment;
      bank[users[1]].transactions = bank[users[1]].transactions + 1;
      bank[users[1]].transactionAmount = bank[users[1]].transactionAmount + +payment;
      fs.writeFileSync('./bank.json', JSON.stringify(bank), function (err) {
        if (err) { throw err;
        } else {console.log('Saved!');}
      })
      fs.appendFile('log.txt', `\n${payer.tag} is paying ${payment} ╔╦╗ to ${payeeUser.tag} for ${reason} {${interactionTime}}`, function (err) {
          if (err) { throw err; 
          } else {console.log('Appended!');}
      })
      return 1;
    } else if(0 > payment){
      return 2;
    } else {
      return 0;
    }
};

function claimBounty(user, value, interactionTime) {
  const bank = JSON.parse(fs.readFileSync('./bank.json', 'utf8'));
  const bounties = JSON.parse(fs.readFileSync('./bounties.json', 'utf8'));
  const users = findUsers(user.tag)
  bank[users[0]].mythrium = bank[users[0]].mythrium + +bounties[value].value;
  bank[users[0]].bountyRewards = bank[users[0]].bountyRewards + +bounties[value].value;
  bank[users[0]].bounties = bank[users[0]].bounties + 1;
  bounties[value].repeat = bounties[value].repeat - 1;
  const bountyLabel = bounties[value].label;
  const bountyValue = bounties[value].value;
  fs.writeFileSync('./bank.json', JSON.stringify(bank), function (err) {
    if (err) { throw err, console.error(err);
    } else {console.log('Saved!');}
  })
  fs.appendFile('log.txt', `\n${user.tag} claimed bounty ${bounties[value].label} for ${bounties[value].value} ╔╦╗ {${interactionTime}}`, function(err) {
    if (err) { throw err; 
    } else {console.log('Appended!');}
  })
  if (bounties[value].repeat > 0) {
    const bountiesString = JSON.stringify(bounties)
    fs.writeFileSync('./bounties.json', bountiesString, function (err) {
      if (err) { throw err, console.error(err);
      } else {console.log('Saved!');}
    })
    return [bounties[value].repeat, bountyLabel, bountyValue];
  } else if (bounties.length !== +value + +1){
    delete bounties[value];
    const bountiesString = JSON.stringify(bounties);
    const nullValue = bountiesString.indexOf('null')
    const sliceString = bountiesString.slice(0, nullValue) + bountiesString.slice(nullValue + 5, bountiesString.length)
    fs.writeFileSync('./bounties.json', sliceString, function (err) {
      if (err) { throw err, console.error(err);
      } else {console.log('Saved!');}
    })
    return [0, bountyLabel, bountyValue];
  } else if (bounties.length !== 1){
    delete bounties[value];
    const bountiesString = JSON.stringify(bounties);
    const nullValue = bountiesString.indexOf('null')
    const sliceString = bountiesString.slice(0, nullValue - 1) + ']'
    fs.writeFileSync('./bounties.json', sliceString, function (err) {
      if (err) { throw err, console.error(err);
      } else {console.log('Saved!');}
    })
    return [0, bountyLabel, bountyValue];
  } else {
    fs.writeFileSync('./bounties.json', "[]", function (err) {
      if (err) { throw err, console.error(err);
      } else {console.log('Saved!');}
    })
    return [0, bountyLabel, bountyValue];
  }
};

function Leaderboard(sortNum) {
  const bank = JSON.parse(fs.readFileSync("./bank.json", 'utf8'));
  var bankString = "";
  var sortElement
  if (+sortNum === 0) {
    bank.sort((a, b) => b.mythrium - a.mythrium);
    const sortElement = "Mythrium";
    var returnElement = [];
    for (var i = 0; i < bank.length; i++) {
      returnElement.push(bank[i].mythrium)
    }
    createElements(sortElement, returnElement)
  } else if (+sortNum === 1) {
    bank.sort((a, b) => b.transactions - a.transactions);
    const sortElement = "Transactions";
    var returnElement = [];
    for (var i = 0; i < bank.length; i++) {
      returnElement.push(bank[i].transactions)
    }
    createElements(sortElement, returnElement)
  } else if (+sortNum === 2) {
    bank.sort((a, b) => b.transactionAmount - a.transactionAmount);
    const  sortElement = "Mythrium Traded";
    var returnElement = [];
    for (var i = 0; i < bank.length; i++) {
      returnElement.push(bank[i].transactionAmount)
    }
    createElements(sortElement, returnElement)
  } else if (+sortNum === 3) {
    bank.sort((a, b) => b.bounties - a.bounties);
    const sortElement = "Bounties Completed";
    var returnElement = [];
    for (var i = 0; i < bank.length; i++) {
      returnElement.push(bank[i].bounties)
    }
    createElements(sortElement, returnElement)
  } else {
    bank.sort((a, b) => b.bountyRewards - a.bountyRewards);
    sortElement = "Bounty Rewards";
    var returnElement = [];
    for (var i = 0; i < bank.length; i++) {
      returnElement.push(bank[i].bountyRewards)
    }
    createElements(sortElement, returnElement)
  }
  function createElements (sortElement, returnElement) {
    for (var i = 0; i < bank.length; i++) {
    bankString = bankString + `${bank[i].name} : ${sortElement} = ${returnElement[i]}\n`
    }
  }
  return bankString;
};

module.exports = { transfer, findUsers, claimBounty , Leaderboard }