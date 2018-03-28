/* eslint-disable */
const input = document.getElementById("search-box");
const submitButton = document.getElementById("submit-button");
const sectionResults = document.getElementById("section-results");

// function clientxhr (url, cb) {
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4) {
//             var result = JSON.parse(xhr.responseText);
//             cb(result);
//         }
//     };
//     xhr.open('GET', url, true);
//     xhr.send();
// }

(function() {
    var url = '/latest';
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var results = JSON.parse(xhr.responseText);
      displayResults(results);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
})();


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

const displayResults = function (articles) {
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