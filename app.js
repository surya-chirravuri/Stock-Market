
var express = require('express');
var router = express.Router();
var app=express();
var xml=require('xml2json');
var sym="";
var urlD;
//var url = "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=";
app.get('/:dat', function (req, res) {
var sym=req.params.dat;
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+sym+'&apikey=9AN30Z0FQZ7747M8&outputsize=full';
//console.log(url+api);
require('https').get(url, function(response){
var body = '';
response.on('data', function(chunk){
    body += chunk;
});

response.on('end', function(){
    console.log(typeof(JSON.parse(body)));
    res.end(body);
 
});
}).on('error', function(e){
  console.log("Got an error: ", e);
});
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.writeHead(200, {'Content-Type': 'text/plain'});
// console.log(urlD);
// res.end(JSON.stringify(urlD)); 
 });
 app.get('/SMA/:dat', function (req, res) {
    var sym=req.params.dat;
    var url = 'https://www.alphavantage.co/query?function=SMA&symbol='+sym+'&interval=daily&time_period=10&series_type=open&apikey=9AN30Z0FQZ7747M8';
    //console.log(url+api);
    require('https').get(url, function(response){
    var body = '';
    response.on('data', function(chunk){
        body += chunk;
    });
    
    response.on('end', function(){
        console.log(typeof(JSON.parse(body)));
       // console.log("SMA");
        res.end(body);
     
    });
    }).on('error', function(e){
      console.log("Got an error: ", e);
    });
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, {'Content-Type': 'text/plain'});
    // console.log(urlD);
    // res.end(JSON.stringify(urlD)); 
     });
     app.get('/EMA/:dat', function (req, res) {
        var sym=req.params.dat;
        var url = 'https://www.alphavantage.co/query?function=EMA&symbol='+sym+'&interval=daily&time_period=10&series_type=open&apikey=9AN30Z0FQZ7747M8';
        //console.log(url+api);
        require('https').get(url, function(response){
        var body = '';
        response.on('data', function(chunk){
            body += chunk;
        });
        
        response.on('end', function(){
            console.log(typeof(JSON.parse(body)));
            res.end(body);
         
        });
        }).on('error', function(e){
          console.log("Got an error: ", e);
        });
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.writeHead(200, {'Content-Type': 'text/plain'});
        // console.log(urlD);
        // res.end(JSON.stringify(urlD)); 
         });
         app.get('/STOCH/:dat', function (req, res) {
            var sym=req.params.dat;
            var url = 'https://www.alphavantage.co/query?function=STOCH&symbol='+sym+'&interval=daily&time_period=10&series_type=open&apikey=9AN30Z0FQZ7747M8';
            //console.log(url+api);
            require('https').get(url, function(response){
            var body = '';
            response.on('data', function(chunk){
                body += chunk;
            });
            
            response.on('end', function(){
                console.log(typeof(JSON.parse(body)));
                res.end(body);
             
            });
            }).on('error', function(e){
              console.log("Got an error: ", e);
            });
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                res.setHeader('Access-Control-Allow-Credentials', true);
                res.writeHead(200, {'Content-Type': 'text/plain'});
            // console.log(urlD);
            // res.end(JSON.stringify(urlD)); 
             });
             app.get('/RSI/:dat', function (req, res) {
                var sym=req.params.dat;
                var url = 'https://www.alphavantage.co/query?function=RSI&symbol='+sym+'&interval=daily&time_period=10&series_type=open&apikey=9AN30Z0FQZ7747M8';
                //console.log(url+api);
                require('https').get(url, function(response){
                var body = '';
                response.on('data', function(chunk){
                    body += chunk;
                });
                
                response.on('end', function(){
                    console.log(typeof(JSON.parse(body)));
                    res.end(body);
                 
                });
                }).on('error', function(e){
                  console.log("Got an error: ", e);
                });
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                    res.setHeader('Access-Control-Allow-Credentials', true);
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                // console.log(urlD);
                // res.end(JSON.stringify(urlD)); 
                 });
                 app.get('/ADX/:dat', function (req, res) {
                    var sym=req.params.dat;
                    var url = 'https://www.alphavantage.co/query?function=ADX&symbol='+sym+'&interval=daily&time_period=10&series_type=open&apikey=9AN30Z0FQZ7747M8';
                    //console.log(url+api);
                    require('https').get(url, function(response){
                    var body = '';
                    response.on('data', function(chunk){
                        body += chunk;
                    });
                    
                    response.on('end', function(){
                        console.log(typeof(JSON.parse(body)));
                        res.end(body);
                     
                    });
                    }).on('error', function(e){
                      console.log("Got an error: ", e);
                    });
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                        res.setHeader('Access-Control-Allow-Credentials', true);
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                    // console.log(urlD);
                    // res.end(JSON.stringify(urlD)); 
                     });
                     app.get('/CCI/:dat', function (req, res) {
                        var sym=req.params.dat;
                        var url = 'https://www.alphavantage.co/query?function=CCI&symbol='+sym+'&interval=daily&time_period=10&series_type=open&apikey=9AN30Z0FQZ7747M8';
                        //console.log(url+api);
                        require('https').get(url, function(response){
                        var body = '';
                        response.on('data', function(chunk){
                            body += chunk;
                        });
                        
                        response.on('end', function(){
                            console.log(typeof(JSON.parse(body)));
                            res.end(body);
                         
                        });
                        }).on('error', function(e){
                          console.log("Got an error: ", e);
                        });
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                            res.setHeader('Access-Control-Allow-Credentials', true);
                            res.writeHead(200, {'Content-Type': 'text/plain'});
                        // console.log(urlD);
                        // res.end(JSON.stringify(urlD)); 
                         });
                         app.get('/BBANDS/:dat', function (req, res) {
                            var sym=req.params.dat;
                            var url = 'https://www.alphavantage.co/query?function=BBANDS&symbol='+sym+'&interval=daily&time_period=10&series_type=open&apikey=9AN30Z0FQZ7747M8';
                            //console.log(url+api);
                            require('https').get(url, function(response){
                            var body = '';
                            response.on('data', function(chunk){
                                body += chunk;
                            });
                            
                            response.on('end', function(){
                                console.log(typeof(JSON.parse(body)));
                                res.end(body);
                             
                            });
                            }).on('error', function(e){
                              console.log("Got an error: ", e);
                            });
                                res.setHeader('Access-Control-Allow-Origin', '*');
                                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                                res.setHeader('Access-Control-Allow-Credentials', true);
                                res.writeHead(200, {'Content-Type': 'text/plain'});
                            // console.log(urlD);
                            // res.end(JSON.stringify(urlD)); 
                             });
                             app.get('/MACD/:dat', function (req, res) {
                                var sym=req.params.dat;
                                var url = 'https://www.alphavantage.co/query?function=MACD&symbol='+sym+'&interval=daily&time_period=10&series_type=open&apikey=9AN30Z0FQZ7747M8';
                                //console.log(url+api);
                                require('https').get(url, function(response){
                                var body = '';
                                response.on('data', function(chunk){
                                    body += chunk;
                                });
                                
                                response.on('end', function(){
                                    console.log(typeof(JSON.parse(body)));
                                    res.end(body);
                                 
                                });
                                }).on('error', function(e){
                                  console.log("Got an error: ", e);
                                });
                                    res.setHeader('Access-Control-Allow-Origin', '*');
                                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                                    res.setHeader('Access-Control-Allow-Credentials', true);
                                    res.writeHead(200, {'Content-Type': 'text/plain'});
                                // console.log(urlD);
                                // res.end(JSON.stringify(urlD)); 
                                 });
        
                                 app.get('/news/:dat', function (req, res) {
                                    var api=req.params.dat;
                                    //console.log(url+api);
                                    var url="https://seekingalpha.com/api/sa/combined/"+api.toUpperCase()+".xml";
                                    require('https').get(url, function(response){
                                    var body = '';
                                    response.on('data', function(chunk){
                                        body += chunk;
                                    });
                                    response.on('end', function(){
                                        // xmlt=body;
                                        // console.log(body);
                                        res.end(xml.toJson(body));
                                        // var temp=xml.toJson(xmlt);
                                        // console.log(typeof(temp));
                                        // res.end
                                    });
                                    }).on('error', function(e){
                                      console.log("Got an error: ", e);
                                    });
                                        res.setHeader('Access-Control-Allow-Origin', '*');
                                        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                                        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                                        res.setHeader('Access-Control-Allow-Credentials', true);
                                        res.writeHead(200, {'Content-Type': 'text/plain'});
                                  
                                     });

                                     app.get('/auto/:dat', function (req, res) {
                                        var url = "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=";
                                        var api=req.params.dat;
                                        //console.log(url+api);
                                        require('http').get(url+api, function(response){
                                        var body = '';
                                        response.on('data', function(chunk){
                                            body += chunk;
                                        });
                                        
                                        response.on('end', function(){
                                            console.log(typeof(JSON.parse(body)));
                                            res.end(body);
                                            // urlD = JSON.parse(body);
                                            // res.end(JSON.stringify(urlD));
                                            // console.log(urlD);
                                            //urlD=body;
                                            //console.log(urlD);
                                        });
                                        }).on('error', function(e){
                                          console.log("Got an error: ", e);
                                        });
                                            res.setHeader('Access-Control-Allow-Origin', '*');
                                            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                                            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                                            res.setHeader('Access-Control-Allow-Credentials', true);
                                            res.writeHead(200, {'Content-Type': 'text/plain'});
                                        // console.log(urlD);
                                        // res.end(JSON.stringify(urlD)); 
                                         });
                                        
                            
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    //console.log("Example app listening at http://%s:%s", host, port)
 });
console.log('Server started');
