/* eslint-disable */
var input = document.getElementById("js-search-box");
var button = document.getElementById("js-submit-button");
var sectionResults = document.getElementById("js-section-results");
var loader = document.getElementById("js-loader");

//xhr request template
var xhrRequest = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      loader.classList.remove("visible");
      loader.classList.add("hidden");
      if (xhr.status === 200){
        var results = JSON.parse(xhr.responseText);
        callback(null, results);
      } else {
        callback('error');
        console.log(callback);
      }
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
  var q = input.value.toLowerCase().trim();
  if (q) {
    clearContents();
    var query = "?q=" + q;
    var url = "/search" + query;
    xhrRequest(url, displayResults);
  }
});

//function to display news on page
function displayResults(error, articles) {
  if (error) {
    console.log(error, "something went wrong");
    return;
  } else {
  if (articles.length === 0) {
    sectionResults.style.display = "block";
    sectionResults.innerHTML = '<h3>No results found! <br> Please try another search query</h3>';
  } else {
  for (var i = 0; i < articles.length; i++) {
    if (articles[i].urlToImage && articles[i].urlToImage.startsWith("http")) {
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
    }
  }
}

//function to clear homepage
var clearContents = function() {
  while (sectionResults.firstChild) {
    sectionResults.removeChild(sectionResults.firstChild);
  }
};
