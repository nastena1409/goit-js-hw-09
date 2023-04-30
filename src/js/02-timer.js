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

let timer = 0;

//console.log('current', currentDate)
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) { 
        const currentDate = Date.now();
        const delta = selectedDates[0] - currentDate;
        console.log('selectedDates', selectedDates[0]);
        console.log('current', currentDate)
        console.log('delta', delta)
        
        if (delta <= 0) {
            alert("Please choose a date in the future");
            return;
        } else {
            refs.startBtn.disabled = false;
        }      
  },
};

const datePicker = flatpickr(refs.dateTimePicker, options);
//console.log(datePicker)

refs.startBtn.addEventListener('click', () => {
timer = setInterval(() => {
    const newDate = Date.now();
    const currentDelta = datePicker.selectedDates[0] - newDate;
    console.log(currentDelta);
    //console.log('new', newDate)
}, 1000)
})


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
