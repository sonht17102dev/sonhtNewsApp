"use strict";
const currentKEY = "currentUser";
const currentUser = JSON.parse(getFromStorage(currentKEY)) || [];
console.log(currentUser);

let currentPage = 1;
let lastpage = 1;
// let country = '';
// let category = '';
// let apiKey = '';
// let pageSize = '';

const searchInput = document.getElementById("input-query");
const btnSearch = document.getElementById("btn-submit");
const newsContainer = document.getElementById("news-container");
const btnPrevious = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

const renderNews = async function (keyWord, page, pageSize) {
  let url = `https://newsapi.org/v2/everything?q=${keyWord}&apiKey=121d8d770a0c4474912887a248851287&page=${page}&pageSize=${pageSize}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  // console.log(data.totalResults);
  // Math.ceil() tra ve so nguyen nho nhat hoac bang chinh so nguyen do, loai bo so thap phan
  lastpage = Math.ceil(data.totalResults / pageSize);

  //kiem tra currentpage => an hien nut prev next
  currentPage === 1
    ? btnPrevious.classList.add("invisible")
    : btnPrevious.classList.remove("invisible");
  currentPage === lastpage
    ? btnNext.classList.add("invisible")
    : btnNext.classList.remove("invisible");
  if (currentPage < 1) {
    newsContainer.innerHTML = "";
    btnPrevious.classList.add("invisible");
  }
  if (currentPage > lastpage) {
    newsContainer.innerHTML = "";
    btnNext.classList.add("invisible");
  }
  newsContainer.innerHTML = "";
  data.articles.forEach((article) => {
    // Nếu a khác null và undefined thì kết quả của a ?? b là a.
    // Ngược lạị, nếu a bằng null hoặc undefined thì kết quả của a ?? b là b.
    // result = a !== null && a !== undefined ? a : b;
    // a ?? b
    const html = `
        <div class="row" style="float: left; margin-bottom: 20px">
        <div style="float: left; width: 30%; padding-right: 20px">
        <img src="${
          article.urlToImage ?? "../img/No_Image_Available.jpg"
        }" style="width: 100%">
        </div>
        <div style="float: left; width: 70%; padding-left: 10px">
        <h4>${article.title ?? "There is no title!"}</h4>
        <p>${article.description ?? "There is no description!"}</p>
        <button type="button" onclick="location.href='${
          article.url
        }'" class="csw-btn-button" style="background-color: #2F89FC; color: white">View</button>
        </div>
        `;
    newsContainer.insertAdjacentHTML("beforeend", html);
  });
};

let data;

// 1.Lấy dữ liệu nhập vào từ form
const inputingForm = function () {
  data = {
    keyWord: searchInput.value,
  };
};
// Hàm validate từ khóa
const validateKey = function () {
  let contentAlert = "";
  if (data.keyWord.trim() === "" || !data.keyWord) {
    contentAlert += "Please input keyword!\n";
  }

  return contentAlert;
};

const search = function () {
  inputingForm();
  validateKey();
  let contentAlert = validateKey(data);
  if (contentAlert.localeCompare("") === 0) {
    console.log(currentUser);
  } else {
    alert(contentAlert);
  }
  renderNews(searchInput.value, 1, 5);
};
// event click vào search để search news theo keyword
btnSearch.addEventListener("click", search);
// khi người dùng nhập liệu xong bấm vào enter để search news theo keyword
function enter(event) {
  // preventDefault() để ngăn hành động mặc định của event nên nó sẽ không được thực hiện
  event.preventDefault();
  search();

  // return false;
}

btnPrevious.addEventListener("click", function () {
  currentPage--;
  pageNum.textContent = `${currentPage}`;
  renderNews(searchInput.value, currentPage, 5);
});
btnNext.addEventListener("click", function () {
  currentPage++;
  pageNum.textContent = `${currentPage}`;
  renderNews(searchInput.value, currentPage, 5);
});
