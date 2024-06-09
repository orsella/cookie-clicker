let cookieCount = 0;
let cookiePerSecond = 1;
let startedInterval = false;
let myInterval;
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const counterDisplay = document.querySelector(".counters");
const cookieDisplay = document.getElementById("cookie-count");
const shopContainer = document.querySelector(".shop-container");
const cpsDisplay = document.getElementById("cookie-per-second");

let shopItems = [];
async function getShopItems() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const json = await response.json();
  shopItems.push(json);
  shopItems = shopItems[0];
}

function renderShop() {
  shopItems.forEach((shopItem) => {
    const item = document.createElement("p");
    const cost = document.createElement("p");
    const increase = document.createElement("p");
    cost.classList.add("p-middle");
    increase.classList.add("p-end");
    const div = document.createElement("div");
    item.textContent = shopItem.name;
    cost.textContent = shopItem.cost;
    increase.textContent = shopItem.increase;
    div.appendChild(item);
    div.appendChild(cost);
    div.appendChild(increase);
    shopContainer.appendChild(div);
  });
}

async function displayShop() {
  const wrangledShop = await getShopItems();
  renderShop(wrangledShop);
}
displayShop();

startButton.addEventListener("click", () => {
  addCookie();
  startInterval();
});

window.onload = function () {
  updateDisplay();
};

function startInterval() {
  if (!startedInterval) {
    startedInterval = true;
    myInterval = setInterval(() => {
      addCPS();
      addCookie();
      saveLocalStorage();
      updateDisplay();
    }, 1000);
  }
}

function addCPS() {
  cookiePerSecond = 1;
}

function addCookie() {
  cookieCount += 1;
  cookieDisplay.innerText = "Cookie Count : " + cookieCount;
  cpsDisplay.innerText = "Cookies Per Second : " + cookiePerSecond;
}

function saveLocalStorage() {
  localStorage.setItem("cookies", cookieCount.toString());
  localStorage.setItem("cookiesPerSec", cookiePerSecond.toString());
}

function updateDisplay() {
  let retrievedCookies = localStorage.getItem("cookies");
  let retrievedCookiesPerSec = localStorage.getItem("cookiesPerSec");
  let cookieNum = Number(retrievedCookies);
  let cookieNumPerSec = Number(retrievedCookiesPerSec);
  cookieCount = cookieNum;
  cookiePerSecond = cookieNumPerSec;
}

resetButton.addEventListener("click", () => {
  clearInterval(myInterval);
  cookieCount = 0;
  cookiePerSecond = 1;
  localStorage.removeItem("cookies");
  localStorage.removeItem("cookiesPerSec");
  cookieDisplay.innerText = "Cookie Count : " + cookieCount;
  cpsDisplay.innerText = "Cookies Per Second : " + cookiePerSecond;
  startedInterval = false;
});
