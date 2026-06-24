let clicks = 0;
let totalClicks = 0;
let clickAdditive = 1;
let clickMultiplier = 1;
let clicksPerSecond = 0;

const upgradeCosts = {
  upgradeOne: 100,
  upgradeTwo: 300,
  upgradeThree: 500,
  automationOne: 100,
};

const upgradeEffects = {
  upgradeOne: () => {
    clickAdditive += 1;
  },
  upgradeTwo: () => {
    clickAdditive += 3;
  },
  upgradeThree: () => {
    clickMultiplier += 1;
  },
  automationOne: () => {
    clicksPerSecond += 1;
  },
};

const upgradeCounts = {
  upgradeOne: 0,
  upgradeTwo: 0,
  automationOne: 0,
  upgradeThree: 0,
};

const upgradeContributions = {
  upgradeOne: () => upgradeCounts.upgradeOne * 1,
  upgradeTwo: () => upgradeCounts.upgradeTwo * 3,
  automationOne: () => upgradeCounts.automationOne * 1,
  upgradeThree: () => upgradeCounts.upgradeThree > 0 ? 1 : 0,
};

function updateScore() {
  document.getElementById('totalClicks').textContent = `${totalClicks}`;
  document.getElementById('lineCount').textContent = `${clicks}`;
  const clicksPerSecondElement = document.getElementById('clicksPerSecond');

  if (clicksPerSecondElement) {
    clicksPerSecondElement.textContent = `${clicksPerSecond}`;
  }
}

function updateUpgradeLabels() {
  $('#upgrade-one').text(upgradeCosts.upgradeOne);
  $('#upgrade-two').text(upgradeCosts.upgradeTwo);
  $('#upgrade-three').text(upgradeCosts.upgradeThree);
  $('#automation-one').text(upgradeCosts.automationOne);
}

function updateUpgradeCounters() {
  $('#upgrade-one-count').text(`Owned: ${upgradeCounts.upgradeOne}`);
  $('#upgrade-one-value').text(`+${upgradeContributions.upgradeOne()}`);
  $('#upgrade-two-count').text(`Owned: ${upgradeCounts.upgradeTwo}`);
  $('#upgrade-two-value').text(`+${upgradeContributions.upgradeTwo()}`);
  $('#automation-one-count').text(`Owned: ${upgradeCounts.automationOne}`);
  $('#automation-one-value').text(`+${upgradeContributions.automationOne()}`);
  $('#upgrade-three-count').text(`Owned: ${upgradeCounts.upgradeThree}`);
  $('#upgrade-three-value').text(`x${upgradeContributions.upgradeThree()}`);
}

function increaseCost(cost) {
  return Math.floor(cost * 1.15);
}

$(document).ready(() => {
  updateUpgradeLabels();
  updateUpgradeCounters();
  updateScore();

  setInterval(function () {
    clicks += clicksPerSecond;
    totalClicks += clicksPerSecond;
    updateScore();
  }, 1000);

  $('#playerName').on('keyup', function () {
    echoInput(this.value, 'greetPlayer');
  });

  $('#bigButton').on('click', () => {
    clicks += clickAdditive * clickMultiplier;
    totalClicks += clickAdditive * clickMultiplier;
    updateScore();
  });

  $('#upgrade-one').on('click', () => {
    const cost = upgradeCosts.upgradeOne;

    if (clicks >= cost) {
      clicks -= cost;
      upgradeEffects.upgradeOne();
      upgradeCounts.upgradeOne += 1;
      upgradeCosts.upgradeOne = increaseCost(cost);
      updateUpgradeLabels();
      updateUpgradeCounters();
      updateScore();
    }
  });

  $('#upgrade-two').on('click', () => {
    const cost = upgradeCosts.upgradeTwo;

    if (clicks >= cost) {
      clicks -= cost;
      upgradeEffects.upgradeTwo();
      upgradeCounts.upgradeTwo += 1;
      upgradeCosts.upgradeTwo = increaseCost(cost);
      updateUpgradeLabels();
      updateUpgradeCounters();
      updateScore();
    }
  });

  $('#upgrade-three').on('click', () => {
    const cost = upgradeCosts.upgradeThree;

    if (clicks >= cost) {
      clicks -= cost;
      upgradeEffects.upgradeThree();
      upgradeCounts.upgradeThree += 1;
      updateUpgradeCounters();
      updateScore();
      $('#upgrade-three').closest('.upgrade-card').remove();
    }
  });

  $('#automation-one').on('click', () => {
    const cost = upgradeCosts.automationOne;

    if (clicks >= cost) {
      clicks -= cost;
      upgradeEffects.automationOne();
      upgradeCounts.automationOne += 1;
      upgradeCosts.automationOne = increaseCost(cost);
      updateUpgradeLabels();
      updateUpgradeCounters();
      updateScore();
    }
  });

  $('#win').on('click', () => {
    if (clicks >= 10000) {
      clicks -= 10000;
      sessionStorage.setItem('final', totalClicks);
      $(location).attr('href', 'win.html');
    }
  });
});

//vars and functinos can be declared here and used in the DOMContentLoaded event listener above.
function echoInput(input, targetId) {
  console.log('in greetPlayer f/n');
  console.log(input);
  document.getElementById(targetId).textContent = `Hello, ${input}!`;
}

function devMode() {
  clicks = 100000;
}