import Notiflix from 'notiflix';

const form = document.querySelector('.form')

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { delay, step, amount }
  } = evt.currentTarget;
  
  let delayValue = Number(delay.value);
  const stepValue = Number(step.value);

  for (let i = 1; i <= amount.value; i += 1) {
    //console.log('step',typeof stepValue)
    //console.log('delay',typeof delayValue)
    createPromise(i, delayValue)
      .then(onResolve)
      .catch(onError)
    
    delayValue += stepValue;
  }
  function onResolve({ position, delay }) {
    //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  }

  function onError({ position, delay }) {
    //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  })  
}
