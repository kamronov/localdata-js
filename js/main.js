var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let elForm = document.querySelector('.header__search_input')
let elInp = document.querySelector('.inp')
let elCardList = document.querySelector('.card_list')
let elKinoYil = document.querySelector('#kinoSelect')
let elReytingSelect = document.querySelector('#reytingSelect');
let elCategoriy = document.querySelector('#categoriya');
const data = movies.slice(10, 22);

elForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const filData = data.filter((item) => item.Title.toLowerCase().includes(elInp.value.toLowerCase()) == true)
  let re = new RegExp(elInp.value, 'gi')
  filData.map((item2) => (
    item2.Title = item2.Title.replace(re, `<mark>${elInp.value}</mark>`)
  ))
  mapper(filData)
})

elInp.addEventListener('input', () => {
  if (elInp.value == '') {
    data.map((item2) => (
      item2.Title = item2.Title.replace('<mark>', ``)
    ))
    mapper(data)
  }
})

mapper(data);
elKinoYil.addEventListener('change', (evn) => {
  let kinoVal = elKinoYil.value;
  elCardList.innerHTML = '';
  if (kinoVal == 'yangi') {
    data.sort((a, b) => {
      return b.movie_year - a.movie_year;
    })
  } else {
    data.sort((a, b) => {
      return a.movie_year - b.movie_year;
    })
  }
  mapper(data);

})

function mapper(data) {
  elCardList.innerHTML = ''
  data.forEach((year) => {
    let newLi = document.createElement('li')
    newLi.className = 'card_item'
    newLi.innerHTML = `<img src="https://i.ytimg.com/vi/${year.ytid}/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB-1yldn5KjqkJlks4tG1pJl9BJOg" alt="">
    
    <h4>${year.Title}</h4>
    <b>${year.Categories}</b> <br>
    <span>${year.imdb_rating}</span> /
    <span>${year.movie_year}</span> <br>
    <a href="https://www.youtube.com/watch?v=${year.ytid}"  target="_blank">Watch movie</a>
    <i id="${year.ytid}" class="bi bi-heart icon_like"></i>
    `

    elCardList.appendChild(newLi)
  })
}


elReytingSelect.addEventListener('change', () => {
  let kinoVal = elReytingSelect.value;
  elCardList.innerHTML = '';
  if (kinoVal == 'yuqori') {
    data.sort((a, b) => {
      return b.imdb_rating - a.imdb_rating;
    })
  } else {
    data.sort((a, b) => {
      return a.imdb_rating - b.imdb_rating;
    })
  }
  mapper(data)
})
let elPagination = document.querySelector('.pagenation__list')
let myCount = movies.length / 12;

for (let i = 1; i <= myCount; i++) {
  let newBtn = document.createElement('button');
  newBtn.textContent = i;
  newBtn.classList = 'page_btn'
  newBtn.id = i;
  elPagination.appendChild(newBtn);
}

let elBtnList = document.querySelectorAll('.page_btn');

elBtnList.forEach((btn) => {
  btn.addEventListener('click', () => {
    let id = btn.id;
    const pageData = movies.slice(id * 12, id * 12 + 12);
    mapper(pageData)
  })
})

const arrCategory = [];

movies.forEach((item) => {
  if (!arrCategory.includes(item.Categories)) {
    arrCategory.push(item.Categories)
  }
})

arrCategory.forEach((item) => {
  let newOpt = document.createElement('option');
  newOpt.textContent = item
  newOpt.value = item
  elCategoriy.appendChild(newOpt);
})

elCategoriy.addEventListener('change', () => {
  mapper(movies.filter((e) => e.Categories == elCategoriy.value));
})
let elIconLike = document.querySelectorAll('.icon_like');
let elLocalList = document.querySelector('.local__list');
const arrLocal = JSON.parse(window.localStorage.getItem('localData')) || [];

function localMap(){
  const localData = JSON.parse(window.localStorage.getItem('localData'))
  localData.forEach((year)=>{
    let newLi = document.createElement('li')
    newLi.className = 'card_item'
    newLi.innerHTML = `<img src="https://i.ytimg.com/vi/${year.ytid}/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB-1yldn5KjqkJlks4tG1pJl9BJOg" alt="">
    
    <h4>${year.Title}</h4>
    <b>${year.Categories}</b> <br>
    <span>${year.imdb_rating}</span> /
    <span>${year.movie_year}</span> <br>
    <a href="https://www.youtube.com/watch?v=${year.ytid}"  target="_blank">Watch movie</a>
   
    `

    elLocalList.appendChild(newLi)
  })

}
elIconLike.forEach((btn) => {
  btn.addEventListener('click', () => {
    if(!arrLocal.find((find) => find.ytid == btn.id)) {
        btn.classList.toggle('bi-heart-fill')
        btn.classList.toggle('bi-heart')
       arrLocal.push(movies.find((item) => item.ytid == btn.id));
       window.localStorage.setItem('localData', JSON.stringify(arrLocal))
      console.log(arrLocal);
    }else{
      btn.classList.toggle('bi-heart-fill')
      btn.classList.toggle('bi-heart')
      let index = arrLocal.indexOf(arrLocal.find((e)=>e.ytid==btn.id))
      if(index > -1){
        arrLocal.splice(index, 1)
      }
      console.log(arrLocal);
    }  
    localMap()
  })
})
localMap()

let elClearLocal = document.querySelector('#clear__btn');

elClearLocal.addEventListener('click', (e)=>{
  elLocalList.innerHTML = ''
  window.localStorage.clear()
})