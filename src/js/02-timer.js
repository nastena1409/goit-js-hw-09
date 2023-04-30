import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    dateTimePicker: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    daysOutput: document.querySelector('span[data-days]'),
    hoursOutput: document.querySelector('span[data-hours]'),
    minutesOutput: document.querySelector('span[data-minutes]'),
    secondsOutput: document.querySelector('span[data-seconds]')
}  

refs.startBtn.disabled = true;
const currentDate = Date.now()

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        setInterval(() => {
            const currentDate = Date.now();
            console.log(currentDate)
        }, 1000)
    console.log(selectedDates[0]);
  },
};

flatpickr(refs.dateTimePicker, options);

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
