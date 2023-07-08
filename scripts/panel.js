const btnAutorization = document.querySelector("#btnAutorization");
const popupLogin = document.querySelector("#login");
export const popupSignup = document.querySelector("#signup");
export const popupClose = document.querySelectorAll(".login__close");
const btn__SingUp = popupLogin.querySelector("#btn__SingUp");
const body = document.querySelector("body");

btnAutorization.addEventListener("click", () => {
  popupLogin.classList.add("active");
  body.classList.add("lock");
});

btn__SingUp.addEventListener("click", () => {
  popupSignup.classList.add("active");
  popupLogin.classList.remove("active");
});

popupClose.forEach((item) => {
  item.addEventListener("click", () => {
    popupLogin.classList.remove("active");
    popupSignup.classList.remove("active");
    body.classList.remove("lock");
  });
});

// document.querySelector(".input_text").focus(function () {
//   $(this).prev(".fa").addclass("glowIcon");
// });
// document.querySelector(".input_text").focusout(function () {
//   $(this).prev(".fa").removeclass("glowIcon");
// });
