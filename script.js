$(function() {
const mainButton = document.getElementById("gameButton");
const cMult = document.getElementById("upgradeCMulti");
const aCBtn = document.getElementById("buyAutoClicker");
const autoDelayBtn = document.getElementById("autoDelay");

const minDelay = 100;
  
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
autoDelayBtn.addEventListener("click", function(){upgrade("autoDelay"); updateButtons();});

function updateButtons() {
  if(clicks == 1){
    mainButton.innerHTML = 'The button has been clicked '+clicks+' time.';
  } else {
    mainButton.innerHTML = 'The button has been clicked '+clicks+' times.';
  }
  cMult.innerHTML = 'Increase Click Multiplier: ' + cMultPrice + ' Clicks';
  aCBtn.innerHTML = 'Buy An Auto-Clicker: ' + aCPrice + ' Clicks';
  if (autoClickerDelayMS > minDelay) {
    autoDelayBtn.innerHTML = 'Upgrade Auto Clicker Speed: ' + aCDelayPrice + ' Clicks';
  } else {
    autoDelayBtn.innerHTML = 'Upgrade Auto Clicker Speed: Max';
    autoDelayBtn.style.backgroundColor = "#888";
    autoDelayBtn.style.color = "#ccc";
    autoDelayBtn.style.cursor = "default";
    autoDelayBtn.disabled = true;
  }
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
     case "autoDelay":
      if (clicks >= aCDelayPrice && autoClickerDelayMS > minDelay) {
        clicks -= aCDelayPrice;
        autoClickerDelayMS -= 1000; // step down by 1000ms
        if (autoClickerDelayMS < minDelay) autoClickerDelayMS = minDelay;
        aCDelayPrice += aCDelayPrice * 2;
        startAutoClicker(); // restart interval w/ new delay
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
  updateButtons();
});
