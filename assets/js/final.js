let clicks = 0;
let totalClicks = 0;
let clickAdditive = 1;
let clickMultiplier = 1;
let clicksPerSecond = 0;
let clicksPerSecondMultiplier = 1;
let clicksExponentAll = 1;
let clicksExponentMan = 1;
let clicksExponentAuto = 1;

const upgradeCosts = {
  upgradeOne: 100,
  upgradeTwo: 300,
  dataOne: 10000,
  automationOne: 100,
  frameworkOne: 500,
};

const upgradeEffects = {
  upgradeOne: () => {
    clickAdditive += 1;
  },
  upgradeTwo: () => {
    clickAdditive += 3;
  },
  dataOne: () => {
    clicksExponentAll += 0.1;
  },
  frameworkOne: () => {
    clicksPerSecondMultiplier *= 2;
  },
  automationOne: () => {
    clicksPerSecond += 1;
  },
};

const upgradeCounts = {
  upgradeOne: 0,
  upgradeTwo: 0,
  automationOne: 0,
  dataOne: 0,
  frameworkOne: 0,
};

const upgradeContributions = {
  upgradeOne: () => upgradeCounts.upgradeOne * 1,
  upgradeTwo: () => upgradeCounts.upgradeTwo * 3,
  automationOne: () => upgradeCounts.automationOne * 1,
  frameworkOne: () => upgradeCounts.frameworkOne * 1,
  dataOne: () => upgradeCounts.dataOne * 1,
};

function updateScore() {
  document.getElementById('totalLines').textContent = `${totalClicks}`;
  document.getElementById('lineCount').textContent = `${clicks}`;
  const linesPerSecondElement = document.getElementById('linesPerSecond');

  if (linesPerSecondElement) {
    linesPerSecondElement.textContent = `${clicksPerSecond * clicksPerSecondMultiplier * clicksExponentAll * clicksExponentAuto}`;
  }
}

function updateUpgradeLabels() {
  $('#upgrade-one').text(upgradeCosts.upgradeOne);
  $('#upgrade-two').text(upgradeCosts.upgradeTwo);
  $('#data-one').text(upgradeCosts.dataOne);
  $('#framework-one').text(upgradeCosts.frameworkOne);
  $('#automation-one').text(upgradeCosts.automationOne);
}

function updateUpgradeCounters() {
  $('#upgrade-one-count').text(`Owned: ${upgradeCounts.upgradeOne}`);
  $('#upgrade-one-value').text(`+${upgradeContributions.upgradeOne()}`);
  $('#upgrade-two-count').text(`Owned: ${upgradeCounts.upgradeTwo}`);
  $('#upgrade-two-value').text(`+${upgradeContributions.upgradeTwo()}`);
  $('#automation-one-count').text(`Owned: ${upgradeCounts.automationOne}`);
  $('#automation-one-value').text(`+${upgradeContributions.automationOne()}`);
  $('#framework-one-count').text(`Owned: ${upgradeCounts.frameworkOne}`);
  $('#framework-one-value').text(`x${upgradeContributions.frameworkOne()}`);
  $('#data-one-count').text(`Owned: ${upgradeCounts.dataOne}`);
  $('#data-one-value').text(`^${upgradeCounts.dataOne > 0 ? clicksExponentAll.toFixed(1) : 0}`);
}

function updateUpgradeAvailability() {
  // (other availability checks follow)
  // Languages / click upgrades (require current `clicks` to purchase)
  const u1 = upgradeCosts.upgradeOne || Infinity;
  if (clicks >= u1) {
    $('#upgrade-one').prop('disabled', false).removeClass('btn-outline-secondary').addClass('btn-outline-primary');
  } else {
    $('#upgrade-one').prop('disabled', true).removeClass('btn-outline-primary').addClass('btn-outline-secondary');
  }

  const u2 = upgradeCosts.upgradeTwo || Infinity;
  if (clicks >= u2) {
    $('#upgrade-two').prop('disabled', false).removeClass('btn-outline-secondary').addClass('btn-outline-primary');
  } else {
    $('#upgrade-two').prop('disabled', true).removeClass('btn-outline-primary').addClass('btn-outline-secondary');
  }

  // Automation upgrade (requires current `clicks` to buy)
  const auto = upgradeCosts.automationOne || Infinity;
  if (clicks >= auto) {
    $('#automation-one').prop('disabled', false).removeClass('btn-outline-secondary').addClass('btn-outline-primary');
  } else {
    $('#automation-one').prop('disabled', true).removeClass('btn-outline-primary').addClass('btn-outline-secondary');
  }

  // Framework upgrade (single-purchase in UI)
  const fw = upgradeCosts.frameworkOne || Infinity;
  if (upgradeCounts.frameworkOne > 0) {
    $('#framework-one').prop('disabled', true).removeClass('btn-outline-primary').addClass('btn-outline-secondary');
  } else if (clicks >= fw) {
    $('#framework-one').prop('disabled', false).removeClass('btn-outline-secondary').addClass('btn-outline-primary');
  } else {
    $('#framework-one').prop('disabled', true).removeClass('btn-outline-primary').addClass('btn-outline-secondary');
  }

  // Data structure upgrade: Arrays uses totalClicks to unlock and is single-purchase
  const ds = upgradeCosts.dataOne || Infinity;
  if (upgradeCounts.dataOne > 0) {
    $('#data-one').prop('disabled', true).removeClass('btn-outline-primary').addClass('btn-outline-secondary');
  } else if (totalClicks >= ds) {
    $('#data-one').prop('disabled', false).removeClass('btn-outline-secondary').addClass('btn-outline-primary');
  } else {
    $('#data-one').prop('disabled', true).removeClass('btn-outline-primary').addClass('btn-outline-secondary');
  }
}

function increaseCost(cost) {
  return Math.floor(cost * 1.15);
}

$(document).ready(() => {
  updateUpgradeLabels();
  updateUpgradeCounters();
  updateScore();
  updateUpgradeAvailability();

  setInterval(function () {
    clicks += clicksPerSecond * clicksPerSecondMultiplier * clicksExponentAll * clicksExponentAuto;
    totalClicks += clicksPerSecond * clicksPerSecondMultiplier * clicksExponentAll * clicksExponentAuto;
    updateScore();
    updateUpgradeAvailability();
  }, 1000);

  $('#playerName').on('keyup', function () {
    echoInput(this.value, 'greetPlayer');
  });

  $('#bigButton').on('click', () => {
    clicks += (clickAdditive * clickMultiplier) * clicksExponentAll * clicksExponentMan;
    totalClicks += (clickAdditive * clickMultiplier) * clicksExponentAll * clicksExponentMan;
    updateScore();
    updateUpgradeAvailability();
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

  // Data structure upgrade: Arrays (purchaseable when totalLines >= cost)
  $('#data-one').on('click', () => {
    const cost = upgradeCosts.dataOne;

    // Become purchaseable based on totalLines (totalClicks). Do not deduct lines when bought.
    if (totalClicks >= cost && upgradeCounts.dataOne === 0) {
      // apply effect immediately
      upgradeEffects.dataOne();
      upgradeCounts.dataOne += 1;

      // disable the button and grey it out so it cannot be bought again
      $('#data-one').prop('disabled', true).removeClass('btn-outline-primary').addClass('btn-outline-secondary');

      // update UI
      updateUpgradeLabels();
      updateUpgradeCounters();
      updateScore();
      updateUpgradeAvailability();
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

  $('#framework-one').on('click', () => {
    const cost = upgradeCosts.frameworkOne;

    if (clicks >= cost) {
      clicks -= cost;
      upgradeEffects.frameworkOne();
      upgradeCounts.frameworkOne += 1;
      upgradeCosts.frameworkOne = increaseCost(cost);
      updateUpgradeLabels();
      updateUpgradeCounters();
      updateScore();
      $('#framework-one').closest('.upgrade-card').remove();
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

//vars and functions can be declared here and used in the DOMContentLoaded event listener above.
function echoInput(input, targetId) {
  console.log('in greetPlayer f/n');
  console.log(input);
  document.getElementById(targetId).textContent = `Hello, ${input}!`;
}

function devMode() {
  clicks = 100000;
}