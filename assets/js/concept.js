let clicks = 0;
let totalClicks = 0;
let clickAdditive = 1;
let clickMultiplier = 1;
let clicksPerSecond = 0;

$(document).ready(() => {
  console.log('jq doc is ready');

  setInterval(function () {
    clicks += clicksPerSecond;
    totalClicks += clicksPerSecond;
    updateScore();
  }, 1000);

  $('#playerName').on('keyup', function () {
    echoInput(this.value, 'greetPlayer');
  });

  $('#bigButton').on('click', function () {
    clicks += clickAdditive * clickMultiplier;
    totalClicks += clickAdditive * clickMultiplier;
    updateScore();
  });

  $('#upgrade-one').on('click', function () {
    if (clicks >= 100) {
      clicks -= 100;
      clickAdditive += 1;
      updateScore();
    }
  });

  $('#upgrade-two').on('click', function () {
    if (clicks >= 300) {
      clicks -= 300;
      clickAdditive += 3;
      updateScore();
    }
  });

  $('#upgrade-three').on('click', function () {
    if (clicks >= 500) {
      clicks -= 500;
      clickMultiplier += 1;
      updateScore();
    }
  });

  $('#automation-one').on('click', function () {
    if (clicks >= 100) {
      clicks -= 100;
      clicksPerSecond += 1;
      updateScore();
    }
  });

  $('#win').on('click', function () {
    if (clicks >= 10000) {
      clicks -= 10000;
      sessionStorage.setItem("final", totalClicks);
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

function updateScore() {
  document.getElementById('totalClicks').textContent = `${totalClicks}`;
  document.getElementById('lineCount').textContent = `${clicks}`;
}

function devMode() {
  clicks = 100000;
}