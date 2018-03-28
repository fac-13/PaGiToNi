/* eslint-disable */
const input = document.getElementById("js-search-box");
const button = document.getElementById("js-submit-button");
const sectionResults = document.getElementById("js-section-results");

//xhr request template 
var xhrRequest = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var results = JSON.parse(xhr.responseText);
      callback(results);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};

//XHR request to display latest news on page load
xhrRequest('/latest', displayResults);

//XHR request to display news matching user input
button.addEventListener('click', function (e) {
  e.preventDefault();
  if (input.value) {
    clearContents();
    var query = '?q=' + input.value;
    var url = '/search' + query;
    xhrRequest(url, displayResults);
  }
}); 

//function to display news on page
function displayResults(articles) {
  for (var i = 0; i < articles.length; i++) {
    var newsArticle = document.createElement('article');
    var newsTitle = document.createElement('h2');
    var newsImage = document.createElement('img');
    var newsDesc = document.createElement('p');
    newsTitle.innerText = articles[i].title;
    newsImage.src = articles[i].urlToImage;
    newsDesc.innerText = articles[i].description;
    newsArticle.appendChild(newsImage);
    newsArticle.appendChild(newsTitle);
    newsArticle.appendChild(newsDesc);
    sectionResults.appendChild(newsArticle);
  }
}

//function to clear homepage
var clearContents = function () {
  while (sectionResults.firstChild) {
    sectionResults.removeChild(sectionResults.firstChild);
  }
};

