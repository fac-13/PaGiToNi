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
    var url = '/';
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var results = JSON.parse(xhr.responseText);
      
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

const displayResults = function (results) {
    var newsArticle = document.createElement('article');
    var newsTitle =
}