/* eslint-disable */
const input = document.getElementById("js-search-box");
const button = document.getElementById("js-submit-button");
const sectionResults = document.getElementById("js-section-results");
const loader = document.getElementById("loader");

//xhr request template
var xhrRequest = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      loader.classList.remove("visible");
      loader.classList.add("hidden");
      var results = JSON.parse(xhr.responseText);
      callback(results);
    } else {
      loader.classList.remove("hidden");
      loader.classList.add("visible");
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};

//XHR request to display latest news on page load
xhrRequest("/latest", displayResults);

//XHR request to display news matching user input
button.addEventListener("click", function(e) {
  e.preventDefault();
  if (input.value) {
    clearContents();
    var query = "?q=" + input.value.toLowerCase().trim();
    var url = "/search" + query;
    xhrRequest(url, displayResults);
  }
});

//function to display news on page
function displayResults(articles) {
  for (var i = 0; i < articles.length; i++) {
    var newsArticle = document.createElement("article");
    newsArticle.className = "article";
    var newsTitle = document.createElement("h2");
    newsTitle.className = "article__title";
    var newsImage = document.createElement("img");
    newsImage.className = "article__img";
    var newsDesc = document.createElement("p");
    newsDesc.className = "article__p";
    var link = document.createElement("a");

    newsTitle.innerText = articles[i].title;
    newsImage.src = articles[i].urlToImage;
    newsImage.alt = articles[i].title;
    link.href = articles[i].url;
    link.title = "Click to go to the source";
    link.target = "_blank";
    newsDesc.innerText = articles[i].description;
    newsArticle.appendChild(newsImage);
    newsArticle.appendChild(newsTitle);
    newsArticle.appendChild(newsDesc);
    link.appendChild(newsArticle);
    sectionResults.appendChild(link);
  }
}

//function to clear homepage
var clearContents = function() {
  while (sectionResults.firstChild) {
    sectionResults.removeChild(sectionResults.firstChild);
  }
};
