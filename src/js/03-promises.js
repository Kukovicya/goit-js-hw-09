// import { reject } from 'lodash';
import Notiflix from 'notiflix';

// const firstDelayInputEl = document.querySelector('input[name="delay"]');
// const delayStepInputEl = document.querySelector('input[name="step"]');
// const amountInputEl = document.querySelector('input[name="amount"]');
// const buttonSubmitEl = document.querySelector('button');
// const submitFormEl = document.querySelector('.form');
// const form = document.querySelector('form.form');
// const amount = form.elements.amount;
const form = document.querySelector('form.form');
// const amount = form.elements.amount;
// const firstDelay = form.elements.delay;
// const stepDelay = form.elements.step;

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
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
  });
  promise.then(({ position, delay }) =>
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`),
  );
  promise.catch(({ position, delay }) =>
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`),
  );
}

form.addEventListener('submit', ev => {
  ev.preventDefault();

  const amount = form.elements.amount;
  const firstDelay = form.elements.delay;
  const stepDelay = form.elements.step;

  let diff = Number(firstDelay.value);

  for (let i = 0; i < Number(amount.value); i += 1) {
    createPromise(i, diff);

    // console.log('fuck');
    diff += Number(stepDelay.value);
  }
});
// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
