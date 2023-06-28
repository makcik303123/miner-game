const fields = document.querySelectorAll(".miner__item");
const rows = document.querySelectorAll(".wrapper");
const btnStart = document.querySelector("#start");
const btnFinish = document.querySelector("#finish");
const multiplierBtn = document.querySelectorAll(".multiplier__btn");
const moneyBtn = document.querySelectorAll(".countMoney__btn");
const input = document.querySelector(".countMoney__input");
const balance = document.querySelector(".panel__balance");

let numberOfRow = 0;
let count = 0;
let multiplier = multiplierBtn[0].value;
let countBombs = 1;
let win = 0;
let bet = input.value + "$";
let loseGame = false;

function addBetter() {
  bet = input.value + "$";
  balance.innerHTML = `${
    (Math.round(balance.innerHTML - bet.slice(0, -1)) * 100) / 100
  } `;
  input.disabled = true;
  moneyBtn.forEach((btn) => (btn.disabled = true));
  multiplierBtn.forEach((btn) => (btn.disabled = true));
}

function showWin() {
  if (!loseGame) {
    win = Math.round(bet.slice(0, -1) * multiplier.slice(2) * 100) / 100;
    bet = win + "$";
    btnFinish.innerHTML = "Take money" + ` ${win}$`;
  } else {
    btnFinish.innerHTML = "Take money";
    win = 0;
    bet = input.value + "$";
  }
}

moneyBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    input.value = btn.value;
  });
});

multiplierBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    countBombs = index + 1;
    multiplier = btn.value;
  });
});

for (let i = 0; i < rows.length; i++) {
  const index = rows[i].querySelectorAll(".miner__item");

  for (let j = 0; j < index.length; j++) {
    index[j].id = `${i}${j}`;
  }
}

btnStart.addEventListener("click", () => {
  console.log(+input.value);
  if (+input.value < 0.1) {
    alert("Сделайте ставку более 0.1$");
  } else if (+balance.innerHTML < +input.value) {
    alert("Пополните счёт");
  } else if (+input.value > 0.1 && +balance.innerHTML >= +input.value) {
    gameOver();
    numberOfRow = 0;
    btnStart.disabled = true;
    loseGame = false;
    addBetter();
    unlockNextRow(numberOfRow);
  } else {
    alert("Введите сумму ставки");
  }
});

fields.forEach((field) => {
  field.addEventListener("click", () => klickField(field));
});

const klickField = (field) => {
  showFields(arrayWithBombs(countBombs), rows[numberOfRow], field.id);
  console.log("field.id", field.id);
  if (!loseGame) {
    numberOfRow !== 9 ? unlockNextRow(numberOfRow + 1) : takeMoney();
    numberOfRow++;
  } else {
    fields.forEach((field) => {
      field.classList.remove("playble");
    });
    btnStart.disabled = false;
    btnFinish.disabled = true;
    input.disabled = false;
    moneyBtn.forEach((btn) => (btn.disabled = false));
    multiplierBtn.forEach((btn) => (btn.disabled = false));
    showWin();
  }
};

function unlockNextRow(numberOfRow) {
  fields.forEach((field) => {
    field.classList.remove("playble");
  });
  if (numberOfRow > 0) {
    showWin();
    btnFinish.disabled = false;
  }
  rows[numberOfRow].querySelectorAll(".miner__item").forEach((field) => {
    field.classList.add("playble");
  });
}

function arrayWithBombs(countBombs, colums = 5) {
  const arrayForRow = Array(colums).fill(0);
  let itemWithBomb;
  let temp = 0;

  while (countBombs > temp) {
    itemWithBomb = Math.ceil(Math.random() * colums) - 1;

    if (arrayForRow[itemWithBomb] !== 1) {
      arrayForRow[itemWithBomb] = 1;
    } else {
      temp--;
    }
    temp++;
  }
  return arrayForRow;
}

function showFields(arrayBombs, arrayId, clickId) {
  arrayId.querySelectorAll(".miner__item").forEach((item) => {
    if (arrayBombs[item.id.slice(-1)] === 1) {
      console.log("bomba");
      addBomb(item.id);
    } else {
      document.getElementById(item.id).classList.add("miner-open-card");
    }
  });
  if (arrayBombs[clickId.slice(-1)] === 1) {
    document.getElementById(clickId).classList.add("miner-dead");
    loseGame = true;
  }
}

function addBomb(id) {
  const image = document.createElement("img");
  image.src = "bomb-svgrepo-com.svg";
  document.getElementById(id).appendChild(image).classList.add("miner__bomb");
}

btnFinish.addEventListener("click", takeMoney);

function takeMoney() {
  balance.innerHTML = Math.round((+balance.innerHTML + win) * 100) / 100;
  btnFinish.innerHTML = "Take money";
  btnStart.disabled = false;
  btnFinish.disabled = true;
  input.disabled = false;
  moneyBtn.forEach((btn) => (btn.disabled = false));
  multiplierBtn.forEach((btn) => (btn.disabled = false));
}

function gameOver() {
  fields.forEach((field) => {
    if (field.firstChild) {
      field.removeChild(field.firstChild);
    }
    field.classList.remove("miner-open-card");
    field.classList.remove("miner-dead");
    field.classList.remove("playble");
  });
}
