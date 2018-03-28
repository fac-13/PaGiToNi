function clientxhr (url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var result = JSON.parse(xhr.responseText);
            cb(result);
            console.log(cb(result));
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

console.log(clientxhr('https://dog.ceo/api/breed/beagle/images/random', cb));
);