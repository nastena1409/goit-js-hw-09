import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    dateTimePicker: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    daysOutput: document.querySelector('span[data-days]'),
    hoursOutput: document.querySelector('span[data-hours]'),
    minutesOutput: document.querySelector('span[data-minutes]'),
    secondsOutput: document.querySelector('span[data-seconds]'),
    
}  

refs.startBtn.disabled = true;

let timerId = 0;

//console.log('current', currentDate)
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) { 
        const currentDate = Date.now();
        const delta = selectedDates[0] - currentDate;
        //console.log('selectedDates', selectedDates[0]);
        //console.log('current', currentDate)
        //console.log('delta', delta)
        
        if (delta <= 0) {
            Notiflix.Notify.failure("Please choose a date in the future");
            return;
        } else {
            refs.startBtn.disabled = false;
        }      
  },
};

const datePicker = flatpickr(refs.dateTimePicker, options);
//console.log(datePicker)


refs.startBtn.addEventListener('click', () => {
    refs.startBtn.disabled = true;
    refs.dateTimePicker.disabled = true;
    timerId = setInterval(() => {
        const newDate = Date.now();
        const currentDelta = datePicker.selectedDates[0] - newDate;
        //console.log(timerId);
        const { days, hours, minutes, seconds } = convertMs(currentDelta);
        console.log(`${days}:${hours}:${minutes}:${seconds}`);
        updateTimerFace({ days, hours, minutes, seconds });
    }, 1000);

    
    if (timerId = 0) {
        clearTimerId(timerId);
        return;
    }
})


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function updateTimerFace ({ days, hours, minutes, seconds }) {
    refs.daysOutput.textContent = `${days}`;
    refs.hoursOutput.textContent = `${hours}`;
    refs.minutesOutput.textContent = `${minutes}`;
    refs.secondsOutput.textContent = `${seconds}`;
}
 