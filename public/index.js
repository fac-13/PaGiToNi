/* eslint-disable */
const input = document.getElementById("js-search-box");
const button = document.getElementById("js-submit-button");
const sectionResults = document.getElementById("js-section-results");

var xhrRequest = function(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
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
// button.addEventListener("click", function(e){
//   e.preventDefault(); 
//   var query = '?q='+ input.value; 
//   var url = '/search' + query; 
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       var results = JSON.parse(xhr.responseText);
//       displayResults(results);
//     }
//   };
//   xhr.open("GET", url, true);
//   xhr.send();

// })

//function to display news on page
function displayResults(articles) {
  for (var i =0 ; i < articles.length; i++) {
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


const search = function() {
  const inputTerms = input.value.toLowerCase();
  if (inputTerms !== "") {
    const url = `/api/search?q=${inputTerms}`;
    fetchXhr(url, function(error, response) {
      if (error) {
        console.error(error);
      } else {
        clearContents(dataList);
        dataListPopulate(response);
      }
    });
  }
};

const clearContents = function(container) {
  input.setAttribute("autocomplete", "off");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

