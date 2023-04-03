"use strict";

const btnLogOut = document.getElementById("btn-logout");
const mainModel = document.getElementById("main-content");
const loginModel = document.getElementById("login-modal");
const welcomeUser = document.getElementById("welcome");
const navLink = document.querySelectorAll(".nav-link");

const currentKEY = "currentUser";

const currentUser = JSON.parse(getFromStorage(currentKEY)) || [];
console.log(currentUser);

// người dùng đã đăng nhập hiển thị thông điệp chào mừng như sau: "Welcome + firstname" và nút Logout
mainModel.classList.add("invisible");
if (currentUser.length !== 0) {
  //nếu user đã login thành công hiển thị các navLink
  navLink.forEach((e) => e.classList.remove("invisible"));
  welcomeUser.classList.add("welcome-content");
  document.querySelector(
    ".welcome-content"
  ).textContent = `Welcome ${currentUser[0].userFirstName}`;
  loginModel.classList.add("invisible");
  mainModel.classList.remove("invisible");
}

// Nhấn vào nút Logout, xóa User hiện tại ở Localstorage và đưa người dùng trở lại trang Login
btnLogOut.addEventListener("click", function () {
  removeStorage(currentKEY);
  // Man hinh Home mat dinh, user chua dang nhap hiển thị màn hình gồm nút đăng nhập và đăng ký.
  loginModel.classList.remove("invisible");
  mainModel.classList.add("invisible");
  welcomeUser.classList.add("welcome-content");
  document.querySelector(".welcome-content").textContent = "";
  window.location.href = "../pages/login.html";
});
