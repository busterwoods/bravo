$(document).ready(() => {

  $('#playerName').on('keyup', function () {
    echoInput(this.value, 'greetPlayer');
  });
});

function echoInput(input, targetId) {
  console.log('in greetPlayer f/n');
  console.log(input);
  document.getElementById(targetId).textContent = `Hello, ${input}!`;
}