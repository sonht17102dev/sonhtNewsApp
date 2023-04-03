"use strict";

const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");

const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
// console.log(userArr);
const currentKEY = "currentUser";
const currentUser = JSON.parse(getFromStorage(currentKEY)) || [];
console.log(currentUser);

const todoKEY = "todoArray";
let todoArray = JSON.parse(getFromStorage(todoKEY)) || [];
console.log(todoArray);

// hàm clear input Task khi người nhập liệu hoàn tất
const clearTask = function () {
  inputTask.value = "";
};
// Hàm xóa task khỏi danh sách khi click vào '×'
const deleteTask = function (userTask) {
  if (confirm("Are You Sure?")) {
    for (let i = 0; i < todoArray.length; i++) {
      if (todoArray[i].task === userTask) {
        todoArray.splice(i, 1);
      }
    }
    displayTask(todoArray);
  }
  saveToStorage(todoKEY, JSON.stringify(todoArray));
};

const displayTask = function () {
  let tableBodyEl = document.getElementById("todo-list");
  tableBodyEl.innerHTML = "";
  // todoArrNew.forEach((element, index) => {
  todoArray.forEach((element, index) => {
    // Hiển thị các Task của owner hiện tại
    //Kiem tra xem owner co phai la current user, neu phai thi moi cho render dong do, khong thi bo qua
    if (currentUser[0].userName === element.owner) {
      const row = document.createElement("li");
      row.innerHTML = `${element.task}<span class="close" onclick="deleteTask('${element.task}')">×</span>`;
      row.addEventListener("click", () => {
        //Khi click vào một Task thì bạn có thể đánh dấu là Task đó đã hoàn thành hoặc chưa hoàn thành
        row.classList.toggle("checked");
        // cập nhật isDone vào Task tương ứng hoàn thành hay chưa hoàn thành
        row.className === "checked"
          ? (todoArray[index].isDone = true)
          : (todoArray[index].isDone = false);
        // cập nhật vào LocalStorage
        saveToStorage(todoKEY, JSON.stringify(todoArray));
      });
      tableBodyEl.appendChild(row);

      //Khi isDone được cập nhật thì cập nhật check vào task nếu đã hoàn thành
      todoArray[index].isDone === true
        ? row.classList.add("checked")
        : row.classList.remove("checked");
      saveToStorage(todoKEY, JSON.stringify(todoArray));
    }
  });
};
// event thêm task vào danh sách
btnAdd.addEventListener("click", function () {
  const userTask = new Task(inputTask.value, currentUser[0].userName, false);
  todoArray.push(userTask);
  displayTask();
  clearTask();
  //Lưu dữ liệu todoList vào LocalStorage.
  saveToStorage(todoKEY, JSON.stringify(todoArray));
  // console.log(todoArray)
});

displayTask(todoArray);
