'use strict'

const currentKEY = "currentUser";
const currentUser = JSON.parse(getFromStorage(currentKEY)) || [];
console.log(currentUser);

let currentPage = 1;
let lastpage = 1;
let country = '';
let category = '';
let apiKey = '';
let pageSize = '';
let page = 1;

const newsContainer = document.getElementById('news-container');
const btnPrevious = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const pageNum = document.getElementById('page-num');

// Hàm lấy api và hiển thị tin tức được trả về từ api
const renderNews = async function (country, category, apiKey, page, pageSize) {
  // tao page 1
  let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

  const res = await fetch(url);
  console.log(res)
  const data = await res.json();
  console.log(data);
  // console.log(data.totalResults);
  lastpage = Math.ceil(data.totalResults / pageSize);

  //Khi đang ở Page số 1 thì nút "Previous" sẽ bị ẩn đi.
  currentPage === 1 ? btnPrevious.classList.add('invisible') : btnPrevious.classList.remove('invisible');
  if (currentPage < 1) {
    newsContainer.innerHTML = '';
    btnPrevious.classList.add('invisible');
  };

  // Nếu như không thể lấy thêm các bài viết nữa, nút "Next" sẽ bị ẩn đi
  currentPage === lastpage ? btnNext.classList.add('invisible') : btnNext.classList.remove('invisible');
  if (currentPage > lastpage){
    newsContainer.innerHTML = '';
    btnNext.classList.add('invisible');
  }

    newsContainer.innerHTML = '';
    data.articles.forEach(article => {
          const html = `
            <div class="row" style="float: left; margin-bottom: 20px">
            <div style="float: left; width: 30%; padding-right: 20px">
            <img src="${article.urlToImage ?? '../img/No_Image_Available.jpg' }" style="width: 100%">
            </div>
            <div style="float: left; width: 70%">
            <h4>${article.title ?? 'There is no title!'}</h4>
            <p>${article.description ?? 'There is no description!'}</p>
            <button type="button" onclick="location.href='${article.url}'" class="csw-btn-button" style="background-color: #2F89FC; color: white">View</button>
            </div>
            `;
            newsContainer.insertAdjacentHTML('beforeend', html);
    });
};
// 
btnPrevious.addEventListener('click', function () {
  //Kiểm tra số page hiện tại được cập nhật tương ứng khi nhấn vào nút
  currentPage--;
  pageNum.textContent = `${currentPage}`;
  renderNews(country, category, apiKey, currentPage, pageSize)
});
btnNext.addEventListener('click', function () {
  //Kiểm tra số page hiện tại được cập nhật tương ứng khi nhấn vào nút
  currentPage++;
  pageNum.textContent = `${currentPage}`;
  renderNews(country, category, apiKey, currentPage, pageSize)
});

// tạo mặc định khi vào trang news
country = 'us';
apiKey = 'c395e6c9926c4a70b8e6ccc769509d4f';
// apiKey = '121d8d770a0c4474912887a248851287';
if (currentUser.length === 1){
  category = 'Business';
  pageSize = 5;
} else {
  // khi setting thay đổi
  category = currentUser[1].category;
  pageSize = currentUser[1].pageSize;
}
renderNews(country, category, apiKey, page, pageSize);

