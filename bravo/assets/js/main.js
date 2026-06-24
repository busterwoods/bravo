$(document).ready(()=> {
  console.log('jq doc is ready');

  let clicks = 0;
  let clickAdditive = 1;
  let clickMultiplier = 1;
  let clicksPerSecond = 0;

  setInterval(function() {
    clicks += clicksPerSecond;
    document.getElementById('lineCount').textContent = `${clicks}`;
  }, 1000);

  $('#playerName').on('keyup', function() {
    echoInput(this.value, 'greetPlayer');
  });

  $('#bigButton').on('click', function() {
    clicks += clickAdditive * clickMultiplier;
    document.getElementById('lineCount').textContent = `${clicks}`;
  });

  $('#upgrade-one').on('click', function() {
    if (clicks >= 100) {
      clicks -= 100;
      clickAdditive += 1;
      document.getElementById('lineCount').textContent = `${clicks}`;
    }
  });

  $('#upgrade-two').on('click', function() {
    if (clicks >= 300) {
      clicks -= 300;
      clickAdditive += 3;
      document.getElementById('lineCount').textContent = `${clicks}`;
    }
  });

  $('#upgrade-three').on('click', function() {
    if (clicks >= 500) {
      clicks -= 500;
      clickMultiplier += 1;
      document.getElementById('lineCount').textContent = `${clicks}`;
    }
  });

  $('#automation-one').on('click', function() {
    if (clicks >= 100) {
      clicks -= 100;
      clicksPerSecond += 1;
      document.getElementById('lineCount').textContent = `${clicks}`;
    }
  });
});

//vars and functinos can be declared here and used in the DOMContentLoaded event listener above.
function echoInput(input, targetId) {
  console.log('in greetPlayer f/n');
  console.log(input);
  document.getElementById(targetId).textContent = `Hello, ${input}!`;
}