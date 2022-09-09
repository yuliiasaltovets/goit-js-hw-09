import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
 
};

let selectedDate = null;
let timerId = null;

refs.btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
      Notiflix.Notify.success('Starting');
      selectedDate = selectedDates[0];
    }
  },
};

flatpickr(refs.dateTimePicker, options);

refs.btnStart.addEventListener('click', onTimer);


function onTime() {
  const  timeDate = Date.now() - selectedDate.getDate();
  console.log(selectedDate.getDate());
  if (timeDate < 0) {
    clearInterval(timerId);
    return;
  }

  onDateConverts(convertMs(timeDate));
}

function onTimer() {
  timerId = setInterval(onTime, 1000);
}

function onConverts(value) {
  return value.toString().padStart(2, '0');
}

function onDateConverts({ days, hours, minutes, seconds }) {
  refs.days.value = onConverts(days);
  refs.hours.textContent = onConverts(hours);
  refs.minutes.textContent = onConverts(minutes);
  refs.seconds.textContent = onConverts(seconds);
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
 

  