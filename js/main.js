var newsContainer = document.querySelector(".news-container");
var countryLinks = document.querySelectorAll("nav ul a");
var categoryLinks = document.querySelectorAll("aside a");

var placeholderImage = `https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png`;

var currentCountryCode = "eg";
var currentCategory = "business";
async function getNews(category , countryCode){
    var response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=30bb6c8e77a5437e9e844b4f11fe1743`);
    var data = await response.json();
    console.log(data);
    displayArticles(data.articles);
}


function displayArticles(arr){
    newsContainer.innerHTML = "";
    for (var i = 0; i < arr.length; i++){
        newsContainer.innerHTML += `
         <article class="col-md-4">
          <div class="inner shadow">
              <img src="${arr[i].urlToImage || placeholderImage}" class="w-100" alt="" />
            <div class="article-body p-3">
                <h2 class="h5">${arr[i].title}</h2>
                <p>${arr[i].description}</p>
                <a href="${arr[i].url}" class="btn btn-primary">Read More</a>
            </div>
          </div>
         </article>`;
    }
}




for (var i = 0; i < countryLinks.length; i++){
    countryLinks[i].addEventListener("click" , function(e){
        var activeLink = document.querySelector("nav ul .active");
        activeLink.classList.remove("active");
        e.target.classList.add("active");
        currentCountryCode = e.target.getAttribute("data-country");
        getNews(currentCategory , currentCountryCode);
    })
}

for (var j = 0; j < categoryLinks.length; j++){
    categoryLinks[j].addEventListener("click" , function(e){
        var activeLink = document.querySelector("aside .active");
        activeLink.classList.remove("active");
        e.target.classList.add("active");
        currentCategory = e.target.getAttribute("data-category");
        getNews(currentCategory , currentCountryCode);
    })
}