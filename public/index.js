/* eslint-disable */
const input = document.getElementById("js-search-box");
const button = document.getElementById("js-submit-button");
const sectionResults = document.getElementById("js-section-results");
const loader = document.getElementById("js-loader");
var title = document.querySelector(".header__title"); 
var navbar = document.querySelector(".navbar")


//xhr request template
var xhrRequest = function(url, callback1, callback2) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      loader.classList.remove("visible");
      loader.classList.add("hidden");
      if (xhr.status === 200) {
        var results = JSON.parse(xhr.responseText);
        callback1(null, results);
        if (callback2){
        callback2(); 
        }
      } else {
        callback("error");
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
  loader.classList.remove("hidden");
  loader.classList.add("visible");
  var q = input.value.toLowerCase().trim();
  if (q === "") {
    input.style.boxShadow = "0 0 10px red";
    input.placeholder = "Please type some text";
  } else {
    input.style.boxShadow = "0 0 0 grey";
    clearContents();
    var query = "?q=" + q;
    var url = "/search" + query;
    xhrRequest(url, displayResults,linkToHomePage);
  }
});

//XHR request to refresh or go back to homepage with latest news 
title.addEventListener("click", function(){
  clearContents();
  deleteLink(); 
  xhrRequest("/latest", displayResults);
}); 

//function to display news on page
function displayResults(error, articles) {
  if (error) {
    console.log(error, "something went wrong");
    sectionResults.style.display = "block";
    sectionResults.innerHTML =
      "<h3>Something went wrong from our part. <br> Please try again later</h3>";
    return;
  } else {
    if (articles.length === 0) {
      sectionResults.style.display = "block";
      sectionResults.innerHTML =
        "<h3>No results found! <br> Please try another search query</h3>";
    } else {
      sectionResults.style.display = "grid";
      for (var i = 0; i < articles.length; i++) {
        if (
          articles[i].urlToImage &&
          articles[i].urlToImage.startsWith("http")
        ) {
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

//function to create link to hompepage when on results page 
var linkToHomePage = function(){
  if(!navbar.firstChild){
  var link = document.createElement("a"); 
  link.classList.add("navbar__link"); 
  var p = document.createTextNode("< Back to homepage"); 
  link.href = "/"; 
  link.appendChild(p); 
  navbar.appendChild(link);  
  }
}

//function to delete the "back to homepage" link
var deleteLink = function (){
    while(navbar.firstChild){
      navbar.removeChild(navbar.firstChild);       
    }
    input.value = ""; 
 }

//function to clear homepage
var clearContents = function() {
  while (sectionResults.firstChild) {
    sectionResults.removeChild(sectionResults.firstChild);
  }
};
