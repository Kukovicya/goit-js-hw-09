const body = document.querySelector('body');
const startB = document.querySelector('button[data-start]');
const stopB = document.querySelector('button[data-stop]');
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

const handleClick = event => {
  let color = getRandomHexColor();
  console.log(event);
  document.body.style.background = color;
};

stopB.disabled = true;
startB.addEventListener(
  'click',

  //   handleClick,
  () => {
    timerId = setInterval(handleClick, 1000);

    startB.disabled = true;
    stopB.disabled = false;
  },
);

stopB.addEventListener('click', () => {
  clearInterval(timerId);
  startB.disabled = false;
  stopB.disabled = true;
});
