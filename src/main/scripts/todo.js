'use strict'

const inputTask = document.getElementById('input-task');
const btnAdd = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');

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
const clearTask= function(){
  inputTask.value = '';
}
// Hàm xóa task khỏi danh sách khi click vào '×'
// const deleteTask = function(userTask,event){
  const deleteTask = function(userTask){
//  console.log('event',event);
//   event.preventDefault();
  if (confirm('Are You Sure?')){
    for (let i= 0; i< todoArray.length; i++){
      if (todoArray[i].task  === userTask){
        todoArray.splice(i, 1);
      }
    }   
  }
  
  displayTask(todoArray);
  saveToStorage(todoKEY, JSON.stringify(todoArray));
};

// document.querySelectorAll('.close').addEventListener('click',function(event){
//   event.preventDefautl();
// });

const displayTask = function () {
 
  let tableBodyEl = document.getElementById("todo-list");
  tableBodyEl.innerHTML = "";
  todoArray.forEach((element, index) => {
    
    if(currentUser[0].userName === element.owner){
    const row = document.createElement("li");
    // row.innerHTML = `${element.task}<span class="close" onclick="deleteTask('${element.task}',event)">×</span>`;
    row.innerHTML = `${element.task}<span class="close" onclick="deleteTask('${element.task}')">×</span>`;
    row.addEventListener("click", function(e) {
      // e.preventDefault();
      // console.log(e.target);
      // if(e.target !== element.children[0]) {
        console.log(element.children[index])
      row.classList.toggle("checked");
      row.className === "checked" ? todoArray[index].isDone = true : todoArray[index].isDone = false ;
      todoArray[index].isDone === true ? row.classList.add("checked"): row.classList.remove("checked");
      // e.stopPropagation();
      console.log(todoArray)
      // saveToStorage(todoKEY, JSON.stringify(todoArray));
      saveToStorage(todoKEY, JSON.stringify(todoArray));
      // }
    });
    tableBodyEl.appendChild(row);
  }
});
};
const validate = function(userTask){
  let contentAlert = '';
  if (!inputTask.value || inputTask.value.trim() === '')
  contentAlert += 'Please input Task';
  return contentAlert;
}
// event thêm task vào danh sách
btnAdd.addEventListener('click', function() {
  const userTask = new Task(inputTask.value, currentUser[0].userName, false);
  let contentAlert = validate(userTask);
  if (contentAlert.localeCompare('') === 0){
    todoArray.push(userTask);
    displayTask();
    clearTask();
  } else {
    alert(contentAlert);
  }
  //Lưu dữ liệu todoList vào LocalStorage.
    saveToStorage(todoKEY, JSON.stringify(todoArray));
    console.log(todoArray)

});


displayTask(todoArray);








