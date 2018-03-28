const handler = require('./handler')

const router = (request, response) => {
const url = request.url;
if (url === '/') {
    console.log('Home route reached');
    handler.handleHome(request, response);
}
else if(url === "/latest"){
    console.log("Latest route reached");
    handler.handleLatest(request, response);

}
else {
    response.writeHead(404, {'Content-Type':'text/html'}); 
    response.end("Page not found"); 
}
}




module.exports = router;