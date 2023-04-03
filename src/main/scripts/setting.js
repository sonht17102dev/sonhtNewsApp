"use strict";
const saveBtn = document.getElementById("btn-submit");
const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");

const currentKEY = "currentUser";
const currentUser = JSON.parse(getFromStorage(currentKEY)) || [];
console.log(currentUser);

let data;

// 1.Lấy dữ liệu nhập vào từ form
const inputingForm = function () {
  data = {
    pageSize: parseInt(pageSizeInput.value),
    category: categoryInput.value,
  };
};
// validate dữ liệu
const validateUser = function () {
  let contentAlert = "";
  if (isNaN(data.pageSize)) {
    contentAlert += "Please input news per page!\n";
  } else {
    if (data.pageSize <= 1)
      contentAlert += "News per page can not less than 1!\n";
  }

  if (categoryInput.options[0].value.localeCompare(data.categoryInput) === 0) {
    contentAlert += "Please select category!\n";
  }
  return contentAlert;
};

// khi nhập liệu xong trả về mặc định
const clearSetting = function () {
  pageSizeInput.value = "";
  categoryInput.value = "General";
};

// event save setting
saveBtn.addEventListener("click", function () {
  inputingForm();
  let contentAlert = validateUser(data);
  if (contentAlert.localeCompare("") === 0) {
    currentUser.push(data);
    alert("Your settings are successful!!!");
    if (currentUser.length > 2) {
      currentUser.splice(1, 1);
      // currentUser.push(data);
      console.log(currentUser);
    }
  } else {
    alert(contentAlert);
  }
  // console.log(currentUser)
  // Sau khi save, trang News được hiển thị theo các tham số vừa nhập.
  saveToStorage(currentKEY, JSON.stringify(currentUser));
  clearSetting();
});
