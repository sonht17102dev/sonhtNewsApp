"use strict";

const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
const currentKEY = "currentUser";
const currentUser = JSON.parse(getFromStorage(currentKEY)) || [];
let data;
console.log(userArr);
console.log(currentUser);
// Hàm tạo object chứa dữ liệu người dùng
const inputingForm = function () {
  data = {
    userName: userNameInput.value,
    password: passwordInput.value,
  };
};
// Hàm validate dữ liệu
const validateUser = function () {
  let contentAlert = "";
  let user;
  if (data.userName.trim() === "" || !data.userName) {
    contentAlert += "Please input username!\n";
  }
  if (data.password.trim() === "" || !data.password) {
    contentAlert += "Please input password!\n";
  }
  if (data.password.length < 9) {
    contentAlert += "Password must be more than 8 characters!\n";
  }
  //thông tin nhập vào trùng với User đã có ở trong danh sách thì tức là đăng nhập thành công
  let check = false;
  for (let i = 0; i < userArr.length; i++) {
    if (
      userArr[i].userName === data.userName &&
      userArr[i].password === data.password
    ) {
      // Lấy giá trị firstName của User thỏa điều kiện để welcome + "firstName"
      user = userArr[i].firstName;
      check = true;
      break;
    }
  }
  if (!check) {
    contentAlert += "Your UserName and password does not matched\n";
  }

  return {
    contentAlert: contentAlert,
    userFirstName: user,
  };
};

btnLogin.addEventListener("click", function () {
  inputingForm();
  let { contentAlert, userFirstName } = validateUser();
  if (contentAlert.localeCompare("") === 0) {
    currentUser.push({ ...data, userFirstName });
    console.log(currentUser);
    // Chuyển về trang Home.
    window.location.href = "../index.html";
  } else {
    alert(contentAlert);
  }
  // lưu thông tin người dùng hiện tại xuống dưới LocalStorage
  saveToStorage(currentKEY, JSON.stringify(currentUser));
});
