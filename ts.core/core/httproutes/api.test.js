
module.exports = function (app) { 
    
    app.post('/echo', function (req, res) { 
        res.send('<h2>ECHO!</h2><br/>' + req.body);
    });

}