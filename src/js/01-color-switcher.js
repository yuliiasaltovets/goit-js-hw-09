
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;



const onChangeClr = (e) => {
   onDisabledBtn();
  timerId = setInterval ( () => {
   const changeColor = getRandomHexColor();
   document.body.style.backgroundColor = `${changeColor}`;
   }, 1000)
}

const onStopChangeClr = (e) => {
   clearInterval(timerId);
   onDisabledBtn();
}

function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onDisabledBtn () {
   if (!startBtn.disabled) {
      startBtn.disabled = true;
      stopBtn.disabled = false
   } else {
      startBtn.disabled = false;
      stopBtn.disabled = true
   }
};

startBtn.addEventListener('click', onChangeClr);
stopBtn.addEventListener('click', onStopChangeClr);



