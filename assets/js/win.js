$(document).ready(() => {

  const finalScore = sessionStorage.getItem('final');
  if (finalScore !== null) {
    document.getElementById('finalScore').innerText = finalScore;
  }
});