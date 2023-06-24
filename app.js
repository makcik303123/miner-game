const fields = document.querySelectorAll(".miner__item");
const rows = document.querySelectorAll(".wrapper");
const btnStart = document.querySelector("#start");

let start = false;
let temp = 0;

for (let i = 0; i < fields.length; i++) {
  fields[i].id = i;
}

btnStart.addEventListener("click", () => {
  btnStart.disabled = true;
  unlockNextRow(0);
});

function unlockNextRow(temp) {
  console.log("нажали кнопку");

  fields.forEach((field) => {
    field.classList.remove("active");
  });

  rows[temp].querySelectorAll(".miner__item").forEach((field) => {
    field.classList.add("active");
    field.addEventListener("click", () => {
      console.log(field.id);
      field.disabled = false;
      temp !== 9 ? unlockNextRow(temp + 1) : console.log("Game Over");
    });
    console.log(field);
  });
}

function addBomb(id) {
  const image = document.createElement("img");
  image.src = "bomb-svgrepo-com.svg";
  document.querySelector(`#${id}`).appendChild(image);
}

function arrayWithBombs(countBombs, colums = 5, rows = 10) {
  const fullArray = [];
  let itemWithBomb;

  for (let i = 0; i < rows; i++) {
    const arrayForRow = Array(colums).fill(0);
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
    console.log(arrayForRow);
    fullArray.push(arrayForRow);
  }

  console.log(itemWithBomb);

  console.log(fullArray);
}
