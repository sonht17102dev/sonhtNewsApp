'use strict'

const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
console.log(userArr);

const firstNameInput = document.getElementById('input-firstname');
const lastNameInput = document.getElementById('input-lastname');
const userNameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const confirmInput = document.getElementById('input-password-confirm');
const btnRegister = document.getElementById('btn-submit');

// 2.Gọi hàm validate để kiểm tra form hợp lệ
const validateUser = function(userData){
  let contentAlert = '';
  // trim() sẽ trả về chuỗi với các khoảng trắng ở đầu và cuối chuỗi đã bị loại bỏ.
  if (userData.userName.trim() === '' || !userData.userName){
    contentAlert += 'Please input username!\n';
  } else {
    // Username không được trùng
    let check = false;
    for (let index = 0; index < userArr.length; index++){ 
      const element = userArr[index];
      // localeCompare so sánh hai chuỗi với nhau, bang 0 tuc la giong nhau
      if (element.userName.localeCompare(userData.userName) === 0){
        check = true;
        break;
      }
    }
    if (check === true) contentAlert += 'Username must be unique\n';
  }

  if (userData.firstName.trim() === '' || !userData.firstName){
    contentAlert += 'Please input first name!\n';
  }

  if (userData.lastName.trim() === '' || !userData.lastName){
  contentAlert += 'Please input last name!\n';
  }
  if (userData.password.trim() === '' || !userData.password ){
    contentAlert += 'Please input password!\n'
  } 
  // Password phải có nhiều hơn 8 ký tự.
  if(userData.password.length < 9) contentAlert += 'password must be more than 8 characters!\n';

  if (userData.confirm.trim() === '' || !userData.confirm){
  contentAlert += 'Please input confirm password!\n';
  }
  if( userData.password.length < 9) contentAlert += 'Confirm password must be more than 8 characters!\n';
  //Password và Confirm Password phải giống nhau
  if (userData.password !== userData.confirm){
    contentAlert += 'passwords do not match';
  } 

  return contentAlert;
}

// 3.Khởi tạo user mới với các dữ liệu hợp lệ 
btnRegister.addEventListener('click', function(e){
  // Lấy dữ liệu nhập vào từ form 
  const userData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    userName: userNameInput.value,
    password: passwordInput.value,
    confirm: confirmInput.value
  };
    console.log(userData);
  let contentAlert = validateUser(userData);
  if (contentAlert.localeCompare('') === 0){
    const user = new User(
      userData.firstName,
      userData.lastName,
      userData.userName,
      userData.password,
    )
    console.log(user)
    userArr.push(user);
    alert('You have successfully registered!')
    // 5.Chuyển trang đến màn hình login
    window.location.href = '../pages/login.html';
  } else {
    alert(contentAlert);
  };
  
  // 4.Thêm user vào mảng, lưu mảng vào localStorage
  saveToStorage(KEY, JSON.stringify(userArr));
})
