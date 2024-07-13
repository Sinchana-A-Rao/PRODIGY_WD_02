let timer;
let startTime;
let elapsedTime = 0;
let laps = [];
let lapsContainer = document.querySelector('.laps');
let display = document.querySelector('.display');

function formatTime(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = time % 1000;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timer = setInterval(function() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
  }, 10);
}

function pause() {
  clearInterval(timer);
}

function reset() {
  clearInterval(timer);
  elapsedTime = 0;
  display.textContent = '00:00:00.000';
  laps = [];
  lapsContainer.innerHTML = '';
  document.querySelector('.start-pause').textContent = 'Start';
}

function lap() {
  let lapTime = formatTime(elapsedTime);
  laps.push(lapTime);
  let lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${laps.length}: ${lapTime}`;
  lapsContainer.appendChild(lapItem);
}

function toggleStartPause() {
  const button = document.querySelector('.start-pause');
  if (button.textContent === 'Start') {
    start();
    button.textContent = 'Pause';
  } else {
    pause();
    button.textContent = 'Start';
  }
}

document.querySelector('.start-pause').addEventListener('click', toggleStartPause);
document.querySelector('.reset').addEventListener('click', reset);
document.querySelector('.lap').addEventListener('click', lap);
