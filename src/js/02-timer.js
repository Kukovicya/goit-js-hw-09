// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { reduce } from 'lodash';
import Notiflix from 'notiflix';

const Variant = document.querySelector('#datetime-picker');
const startB = document.querySelector('button[data-start]');
let body = document.querySelector('body');
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startB.disabled = true;

let now = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    // futData = selectedDates[0];
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startB.disabled = true;
      return;
    }
    startB.disabled = false;
  },
};
body.style.backgroundColor = 'green';
const fp = flatpickr(Variant, options);

let deadline = null;
let setIntervalForTimer = null;

startB.addEventListener('click', event => {
  setIntervalForTimer = setInterval(() => {
    deadline = new Date(Variant.value);
    let convertedDate = convertMs(Number(deadline) - Number(new Date()));
    console.log(convertedDate.seconds);
    if (convertedDate.seconds == 0) {
      clearInterval(setIntervalForTimer);
      body.style.backgroundColor = 'red';
      Notiflix.Notify.failure('Time is over!!!');
      //   return;
    }
    document.querySelector('span[data-days]').textContent = addLeadingZero(convertedDate.days);
    document.querySelector('span[data-hours]').textContent = addLeadingZero(convertedDate.hours);
    document.querySelector('span[data-minutes]').textContent = addLeadingZero(
      convertedDate.minutes,
    );
    document.querySelector('span[data-seconds]').textContent = addLeadingZero(
      convertedDate.seconds,
    );
  }, 1000);
});
require('flatpickr/dist/themes/dark.css');

console.log();
