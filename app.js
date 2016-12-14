var express = require ('express');
var app = express();


app.get('/', function(req,res){
  res.sendFile(__dirname+'/dist/index.html');
});

app.use(express.static('dist'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.listen(3000, function(){
  console.log('Server launched. App is listening on port 3000');
});
