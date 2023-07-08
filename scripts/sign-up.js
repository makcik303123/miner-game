const submitSignUp = document.querySelector("#submitSignUp");
const inputSignUpUsername = document.querySelector("#inputSignUpUsername");
const inputSignUpPassword = document.querySelector("#inputSignUpPassword");

console.log(inputSignUpPassword);
console.log(inputSignUpUsername);
console.log(submitSignUp);

window.addEventListener("submit", (e) => {
  e.preventDefault();
  sendEmail();
});

const sendEmail = async () => {
  console.log(true);
  try {
    await fetch(
      "https://miner-userlist-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
      {
        method: "POST",
        body: JSON.stringify({
          username: inputSignUpUsername.value,
          password: inputSignUpPassword.value,
        }),
        headers: { "Content-type": "application/json" },
        name: "122121",
      }
    ).then((response) => console.log(response));
    inputSignUpUsername.value = "";
    inputSignUpPassword.value = "";
  } catch (err) {
    console.log(err);
  }
};
