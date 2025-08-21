$(function() {
const mainButton = document.getElementById("gameButton");
const cMult = document.getElementById("upgradeCMulti");
const aCBtn = document.getElementById("buyAutoClicker");
let clicks = 0;
let clickMulti = 1;
let cMultPrice = 25;
let autoClickers = 0;
let aCPrice = 100;
let autoClickerDelayMS = 5000;
let acInterval;
let aCDelayPrice = 1000;
let autoclickerMulti = 1;
let aCMultiPrice = 10000;

mainButton.addEventListener("click", function(){handleClicks(); updateButtons();})
cMult.addEventListener("click", function(){upgrade("cMulti"); updateButtons();});
aCBtn.addEventListener("click", function(){upgrade("autoClicker"); updateButtons();})

function updateButtons() {
  if(clicks == 1){
    mainButton.innerHTML = 'The button has been clicked '+clicks+' time.';
  } else {
    mainButton.innerHTML = 'The button has been clicked '+clicks+' timaes.';
  }
  cMult.innerHTML = 'Increase Click Multiplier: ' + cMultPrice + ' Clicks';
}

function handleClicks() {
  clicks = clicks + (1 * clickMulti);
}

function upgrade(attribute){
  switch (attribute) {
    case "cMulti":
      if(clicks >= cMultPrice){
        clicks = clicks - cMultPrice;
        clickMulti ++;
        cMultPrice = cMultPrice + cMultPrice * 2;
      }
     break;
     case "autoClicker":
      if (clicks >= aCPrice) {
        clicks = clicks - aCPrice;
        autoClickers ++;
        aCPrice = aCPrice + aCPrice * 2;
      }
     break;
  }
}
  
function startAutoClicker() {
  if (autoClickerInterval) {
    clearInterval(autoClickerInterval);
  }
  autoClickerInterval = setInterval(function () {
    if (autoClickers > 0) {
      clicks += autoClickers * autoclickerMulti;
      updateButtons();
    }
  }, autoClickerDelayMS);
}

startAutoClicker();
});
