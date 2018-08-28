var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var mysql=require('mysql');
var connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'employee'
});
connection.connect(function(err){
   if(err) throw err
    console.log("your are connect");
});
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));
// Running Server Details.
var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});
 
 
app.get('/form', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/thank'  method='post' name='form1'>";
  html += "Name:</p><input type='text' name='name'>";
  html += "address:</p><input type='text' name='address'>";
  html += "Mobile number:</p><input type='text' name='mobilno'>";
  html += "<input type='submit' value='submit'>";
  html += "<INPUT type='reset'  value='reset'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});
 
app.post('/thank', urlencodedParser, function (req, res){
  var reply='';
  reply += "Your name is" + req.body.name+"<br>";
  reply += "Your address is" + req.body.address+"<br>";
  reply += "Your mobile number is" + req.body.mobilno+"<br>";
   var n=req.body.name;
  var c=req.body.address;
  var p=req.body.mobilno;
  
  //var postdata=req.body;
  var crypto = require('crypto');
  var a=[n,c,p];
  var b=new Array();
  for(var i=0;i<a.length;i++)
{
  const cipher = crypto.createCipher('aes192', '123');   // crypto.createCipher(algorithm, password[, options])
  var x = cipher.update(a[i], 'utf8', 'hex');  
  x += cipher.final('hex');  
  b.push(x);
}

  var sql="insert into info(Sname,Scity,Sphoneno)values('"+b[0]+"','"+b[1]+"','"+b[2]+"')";
  connection.query(sql,function(err){
    if(err) throw err;
    console.log("recort is insert successfully");
  });
  res.send(reply);
});
app.get('/employee',function(req,res){
     connection.query("delete from info where Sname='mani'",function(error,results){
       if(error) throw error;
       res.end(JSON.stringify(results));
      });
  });