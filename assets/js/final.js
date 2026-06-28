let clicks = 0;
let totalClicks = 0;
let clickAdditive = 1;
let clickMultiplier = 1;
let clicksPerSecond = 0;
let clicksPerSecondMultiplier = 1;
let clicksExponentAll = 1;
let clicksExponentMan = 1;
let clicksExponentAuto = 1;
let purchaseMultiplier = 1;

const upgradeButtonSelectors = {
  upgradeOne: '#upgrade-one',
  upgradeTwo: '#upgrade-two',
  upgradeThree: '#upgrade-three',
  upgradeFour: '#upgrade-four',
  upgradeFive: '#upgrade-five',
  automationOne: '#automation-one',
  automationTwo: '#automation-two',
  automationThree: '#automation-three',
  frameworkOne: '#framework-one',
  frameworkTwo: '#framework-two',
  frameworkThree: '#framework-three',
  dataOne: '#data-one',
  dataTwo: '#data-two',
  dataThree: '#data-three',
};

const upgradeRepeatable = {
  upgradeOne: true,
  upgradeTwo: true,
  upgradeThree: true,
  upgradeFour: true,
  upgradeFive: true,
  automationOne: true,
  automationTwo: true,
  automationThree: true,
  frameworkOne: false,
  frameworkTwo: false,
  frameworkThree: false,
  dataOne: false,
  dataTwo: false,
  dataThree: false,
};

const upgradeCosts = {
  upgradeOne: 100,
  upgradeTwo: 300,
  upgradeThree: 500,
  upgradeFour: 1000,
  upgradeFive: 1750,
  automationOne: 100,
  automationTwo: 1000,
  automationThree: 5200,
  frameworkOne: 500,
  frameworkTwo: 1000,
  frameworkThree: 1500,
  dataOne: 10000,
  dataTwo: 50000,
  dataThree: 75000,
};

const upgradeEffects = {
  upgradeOne: () => {
    clickAdditive += 1;
  },
  upgradeTwo: () => {
    clickAdditive += 3;
  },
  upgradeThree: () => {
    clickAdditive += 6;
  },
  upgradeFour: () => {
    clickAdditive += 12;
  },
  upgradeFive: () => {
    clickAdditive += 20;
  },
  dataOne: () => {
    clicksExponentAll += 0.1;
  },
  dataTwo: () => {
    clicksExponentMan *= 2;
  },
  dataThree: () => {
    clicksExponentAuto *= 2;
  },
  frameworkOne: () => {
    clicksPerSecondMultiplier *= 2;
  },
  frameworkTwo: () => {
    clicksPerSecondMultiplier *= 3;
  },
  frameworkThree: () => {
    clickMultiplier *= 5;
  },
  automationOne: () => {
    clicksPerSecond += 1;
  },
  automationTwo: () => {
    clicksPerSecond += 9;
  },
  automationThree: () => {
    clicksPerSecond += 42;
  },
};

const upgradeCounts = {
  upgradeOne: 0,
  upgradeTwo: 0,
  upgradeThree: 0,
  upgradeFour: 0,
  upgradeFive: 0,
  automationOne: 0,
  automationTwo: 0,
  automationThree: 0,
  dataOne: 0,
  dataTwo: 0,
  dataThree: 0,
  frameworkOne: 0,
  frameworkTwo: 0,
  frameworkThree: 0,
};

const upgradeContributions = {
  upgradeOne: () => upgradeCounts.upgradeOne * 1,
  upgradeTwo: () => upgradeCounts.upgradeTwo * 3,
  upgradeThree: () => upgradeCounts.upgradeThree * 6,
  upgradeFour: () => upgradeCounts.upgradeFour * 12,
  upgradeFive: () => upgradeCounts.upgradeFive * 20,
  automationOne: () => upgradeCounts.automationOne * 1,
  automationTwo: () => upgradeCounts.automationTwo * 9,
  automationThree: () => upgradeCounts.automationThree * 42,
  frameworkOne: () => upgradeCounts.frameworkOne > 0 ? 2 : 0,
  frameworkTwo: () => upgradeCounts.frameworkTwo > 0 ? 3 : 0,
  frameworkThree: () => upgradeCounts.frameworkThree > 0 ? 5 : 0,
  dataOne: () => upgradeCounts.dataOne * 1,
  dataTwo: () => upgradeCounts.dataTwo > 0 ? clicksExponentMan.toFixed(1) : 0,
  dataThree: () => upgradeCounts.dataThree > 0 ? clicksExponentAuto.toFixed(1) : 0,
};

function formatNumber(value) {
  if (typeof value === 'string' && value.trim() === '—') {
    return '—';
  }

  return Math.round(Number(value) || 0);
}

function calculateBulkCost(startCost, quantity) {
  let total = 0;
  let current = startCost;

  for (let i = 0; i < quantity; i += 1) {
    total += current;
    current = increaseCost(current);
  }

  return total;
}

function calculateMaxPurchasableCount(startCost, availableClicks) {
  let total = 0;
  let current = startCost;
  let count = 0;

  while (total + current <= availableClicks) {
    total += current;
    count += 1;
    current = increaseCost(current);
  }

  return count;
}

function getBulkPurchaseCount(upgradeKey) {
  if (!upgradeRepeatable[upgradeKey]) {
    return 1;
  }

  if (purchaseMultiplier === 'max') {
    return calculateMaxPurchasableCount(upgradeCosts[upgradeKey], clicks);
  }

  return Number(purchaseMultiplier) || 1;
}

function getBulkPurchaseCost(upgradeKey) {
  const quantity = getBulkPurchaseCount(upgradeKey);
  if (quantity <= 0) {
    return 0;
  }

  return calculateBulkCost(upgradeCosts[upgradeKey], quantity);
}

function getBulkButtonText(upgradeKey) {
  const quantity = getBulkPurchaseCount(upgradeKey);

  if (quantity <= 0) {
    return '—';
  }

  return getBulkPurchaseCost(upgradeKey);
}

function updateScore() {
  const perClickValue = (clickAdditive * clickMultiplier) * clicksExponentAll * clicksExponentMan;
  const perSecondValue = clicksPerSecond * clicksPerSecondMultiplier * clicksExponentAll * clicksExponentAuto;

  document.getElementById('totalLines').textContent = `${formatNumber(totalClicks)}`;
  document.getElementById('lineCount').textContent = `${formatNumber(clicks)}`;
  const linesPerClickElement = document.getElementById('linesPerClick');
  const linesPerSecondElement = document.getElementById('linesPerSecond');

  if (linesPerClickElement) {
    linesPerClickElement.textContent = `${formatNumber(perClickValue)}`;
  }

  if (linesPerSecondElement) {
    linesPerSecondElement.textContent = `${formatNumber(perSecondValue)}`;
  }
}

function updateUpgradeLabels() {
  Object.entries(upgradeButtonSelectors).forEach(([upgradeKey, selector]) => {
    $(selector).text(formatNumber(getBulkButtonText(upgradeKey)));
  });
}

function updateUpgradeCounters() {
  $('#upgrade-one-count').text(`Owned: ${upgradeCounts.upgradeOne}`);
  $('#upgrade-one-value').text(`+${formatNumber(upgradeContributions.upgradeOne())}`);
  $('#upgrade-two-count').text(`Owned: ${upgradeCounts.upgradeTwo}`);
  $('#upgrade-two-value').text(`+${formatNumber(upgradeContributions.upgradeTwo())}`);
  $('#automation-one-count').text(`Owned: ${upgradeCounts.automationOne}`);
  $('#automation-one-value').text(`+${formatNumber(upgradeContributions.automationOne())}`);
  $('#automation-two-count').text(`Owned: ${upgradeCounts.automationTwo}`);
  $('#automation-two-value').text(`+${formatNumber(upgradeContributions.automationTwo())}`);
  $('#automation-three-count').text(`Owned: ${upgradeCounts.automationThree}`);
  $('#automation-three-value').text(`+${formatNumber(upgradeContributions.automationThree())}`);
  $('#framework-one-count').text(`Owned: ${upgradeCounts.frameworkOne}`);
  $('#framework-one-value').text(`x${formatNumber(upgradeContributions.frameworkOne())}`);
  $('#framework-two-count').text(`Owned: ${upgradeCounts.frameworkTwo}`);
  $('#framework-two-value').text(`x${formatNumber(upgradeContributions.frameworkTwo())}`);
  $('#framework-three-count').text(`Owned: ${upgradeCounts.frameworkThree}`);
  $('#framework-three-value').text(`x${formatNumber(upgradeContributions.frameworkThree())}`);
  $('#data-one-count').text(`Owned: ${upgradeCounts.dataOne}`);
  $('#data-one-value').text(`^${upgradeCounts.dataOne > 0 ? formatNumber(clicksExponentAll) : 0}`);
  $('#data-two-count').text(`Owned: ${upgradeCounts.dataTwo}`);
  $('#data-two-value').text(`^${upgradeCounts.dataTwo > 0 ? formatNumber(clicksExponentMan) : 0}`);
  $('#data-three-count').text(`Owned: ${upgradeCounts.dataThree}`);
  $('#data-three-value').text(`^${upgradeCounts.dataThree > 0 ? formatNumber(clicksExponentAuto) : 0}`);
}

function canBuyUpgrade(upgradeKey) {
  const quantity = getBulkPurchaseCount(upgradeKey);

  if (quantity <= 0) {
    return false;
  }

  if (upgradeKey.startsWith('data')) {
    return totalClicks >= upgradeCosts[upgradeKey] && upgradeCounts[upgradeKey] === 0;
  }

  if (!upgradeRepeatable[upgradeKey] && upgradeCounts[upgradeKey] > 0) {
    return false;
  }

  const totalCost = getBulkPurchaseCost(upgradeKey);
  return clicks >= totalCost;
}

function purchaseRepeatableUpgrade(upgradeKey) {
  const quantity = getBulkPurchaseCount(upgradeKey);
  const totalCost = getBulkPurchaseCost(upgradeKey);

  if (quantity <= 0 || clicks < totalCost) {
    return;
  }

  clicks -= totalCost;

  for (let i = 0; i < quantity; i += 1) {
    upgradeEffects[upgradeKey]();
    upgradeCounts[upgradeKey] += 1;
    upgradeCosts[upgradeKey] = increaseCost(upgradeCosts[upgradeKey]);
  }

  updateUpgradeLabels();
  updateUpgradeCounters();
  updateScore();
  updateUpgradeAvailability();
}

function setButtonState(selector, enabled) {
  const $button = $(selector);
  $button.prop('disabled', !enabled);
  $button.toggleClass('btn-outline-primary', enabled).toggleClass('btn-outline-secondary', !enabled);
}

function updateUpgradeAvailability() {
  Object.entries(upgradeButtonSelectors).forEach(([upgradeKey, selector]) => {
    setButtonState(selector, canBuyUpgrade(upgradeKey));
  });
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

  $('.bulk-purchase-toggle').on('click', function () {
    purchaseMultiplier = $(this).data('multiplier');
    $('.bulk-purchase-toggle').removeClass('active');
    $(this).addClass('active');
    updateUpgradeLabels();
    updateUpgradeAvailability();
  });

  Object.entries({
    upgradeOne: 'upgradeOne',
    upgradeTwo: 'upgradeTwo',
    upgradeThree: 'upgradeThree',
    upgradeFour: 'upgradeFour',
    upgradeFive: 'upgradeFive',
    automationOne: 'automationOne',
    automationTwo: 'automationTwo',
    automationThree: 'automationThree',
  }).forEach(([buttonKey, upgradeKey]) => {
    $(upgradeButtonSelectors[upgradeKey]).on('click', () => {
      purchaseRepeatableUpgrade(upgradeKey);
    });
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

  $('#framework-two').on('click', () => {
    const cost = upgradeCosts.frameworkTwo;

    if (clicks >= cost) {
      clicks -= cost;
      upgradeEffects.frameworkTwo();
      upgradeCounts.frameworkTwo += 1;
      upgradeCosts.frameworkTwo = increaseCost(cost);
      updateUpgradeLabels();
      updateUpgradeCounters();
      updateScore();
      $('#framework-two').closest('.upgrade-card').remove();
    }
  });

  $('#framework-three').on('click', () => {
    const cost = upgradeCosts.frameworkThree;

    if (clicks >= cost) {
      clicks -= cost;
      upgradeEffects.frameworkThree();
      upgradeCounts.frameworkThree += 1;
      upgradeCosts.frameworkThree = increaseCost(cost);
      updateUpgradeLabels();
      updateUpgradeCounters();
      updateScore();
      $('#framework-three').closest('.upgrade-card').remove();
    }
  });

  $('#data-two').on('click', () => {
    const cost = upgradeCosts.dataTwo;

    if (totalClicks >= cost && upgradeCounts.dataTwo === 0) {
      upgradeEffects.dataTwo();
      upgradeCounts.dataTwo += 1;
      $('#data-two').prop('disabled', true).removeClass('btn-outline-primary').addClass('btn-outline-secondary');
      updateUpgradeLabels();
      updateUpgradeCounters();
      updateScore();
      updateUpgradeAvailability();
    }
  });

  $('#data-three').on('click', () => {
    const cost = upgradeCosts.dataThree;

    if (totalClicks >= cost && upgradeCounts.dataThree === 0) {
      upgradeEffects.dataThree();
      upgradeCounts.dataThree += 1;
      $('#data-three').prop('disabled', true).removeClass('btn-outline-primary').addClass('btn-outline-secondary');
      updateUpgradeLabels();
      updateUpgradeCounters();
      updateScore();
      updateUpgradeAvailability();
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