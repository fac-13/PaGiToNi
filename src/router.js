const handler = require('./handler')

const router = (request, response) =>{
    const url = request.url; 
    if (url === '/'){
        console.log('Home route working'); 
    }
}





module.exports = router; 