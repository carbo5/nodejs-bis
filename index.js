const http = require('http');
const url = require('url');
const fs = require('fs');


http.createServer( (req, res) => {
    const query_url = url.parse(req.url, true);


    let filename;
    // = query_url.pathname;

    if(query_url.pathname === '/'){
        filename = '.' + query_url.pathname + 'index.html';
    }else{
        filename = '.' + query_url.pathname;
    }

    fs.readFile(filename, (err, data) => {

        if(err){
            const errorPage = './404.html'
            return fs.readFile(errorPage, (err_page , data_page_error) =>{
                if(err_page) throw err
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(data_page_error);
                return res.end();
            });
            
             
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);