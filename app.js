var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Dbconnect=require('./database/db').Dbconnect;
const getDb=require('./database/db').getDb;
const oracledb =require('oracledb');
const cors=require('cors');
const fileUpload=require('express-fileupload');
var uniqid = require('uniqid');
var SimpleOracleDB = require('simple-oracledb');
const bodyParser=require('body-parser');
SimpleOracleDB.extend(oracledb);

var migrationrouter = require('./routes/migrationRoute');

var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use('/migration', migrationrouter);

// catch 404 and forward to error handler



var server=app.listen(()=>{
    console.log('got you');
    //console.log(getDb())
  })

//Dbconnect().then(res=>{
  //console.log(res);
 // var server=app.listen(()=>{
 //   console.log('got you')
    //console.log(getDb())
 // })
//})
//.catch(err=>console.log(err))


module.exports=app;