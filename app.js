let cookieCount = 0;
let cookiePerSecond = 1;
const startButton = document.getElementById("start-button");
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

//turn into function
startButton.addEventListener("click", () => {
  cookieCount += 1;
  cookieDisplay.innerText = "Cookie Count : " + cookieCount;
  cpsDisplay.innerText = "Cookies Per Second : " + cookiePerSecond;
  localStorage.setItem("cookies", cookieCount.toString());
  localStorage.setItem("cookiesPerSec", cookiePerSecond.toString());
});

startButton.addEventListener(
  "click",
  () => {
    function repeatMyself() {
      cookieCount += 1;
    }
    setInterval(repeatMyself, 1000);
  },
  { once: true }
);

function updateDisplay() {
  let retrievedCookies = localStorage.getItem("cookies");
  let retrievedCookiesPerSec = localStorage.getItem("cookiesPerSec");
  let cookieNum = Number(retrievedCookies);
  let cookieNumPerSec = Number(retrievedCookiesPerSec);
  cookieCount = cookieNum;
  cookiePerSecond = cookieNumPerSec;
}
updateDisplay();

// have all the game in one fucntion
// need to check if any values stored in local storage
// at least cookiecounter and cps
// have to check as cant use counter as local storage is newer data

// load the game ---> load() calls the game function
//fetch the shop items
// display shop items on page

// we need a timer to increase the cookies we get every second

setInterval(function () {});
//increase the value of cookiecounter by 1 each second
// i want to update the value displayed on the page (or could have in seperate function that you call inside interval such as updateDisplay())
// update in local storage or could have in seperate function that you call inside interval such as save local storage())

// help if you want to put tasks into different fucntions
// function updateDisplay() {
//update the dom element containing the value of cookiecounter e.g p tag
//update content value of cookies from local storage (current total)

function saveLocalStorage() {
  //a method to turn your data into string
  // method to set items into key and value in local storage
}

// function renderShop() {
// create dom elements to display your shop items
// can use for loop or array method
// shopItems.forEach(() => {});
// }
