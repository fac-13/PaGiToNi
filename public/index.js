function clientxhr (url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var result = JSON.parse(xhr.responseText);
            cd(result);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}