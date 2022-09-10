
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateTime: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let selectedDate = null;

refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', onTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // ============IF ELSE================
  onClose(selectedDates) {
    if (selectedDates[0].getTime() >= Date.now()) {
      selectedDate = selectedDates[0];
      refs.btnStart.disabled = false;
      Notiflix.Notify.success('Push the button');
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(refs.dateTime, options);

// ========Finding difference============
function onTimer() {
  timerId = setInterval(onDate, 1000);
}

function onDate() {
  const timeMs = selectedDate.getTime() - Date.now();

  if (timeMs < 0) {
    clearInterval(timerId);
    return;
  }

  onTimerUpd(convertTime(timeMs));
}
// ===========Converting the time===============
function onTimerUpd({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = onZero(days);
  refs.dataHours.textContent = onZero(hours);
  refs.dataMinutes.textContent = onZero(minutes);
  refs.dataSeconds.textContent = onZero(seconds);
}
function onZero(value) {
  return value.toString().padStart(2, '0');
}

function convertTime(ms) {
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