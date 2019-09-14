var exp           = require('express'),
    parser        = require('body-parser'),
    mongoose      = require('mongoose')

var sessions = require("client-sessions");



    mongoose.connect('mongodb://localhost:27017/DemoAuth',{ useNewUrlParser: true },function(err){
        if(err)
        console.log(err)
           else{
           console.log("Connection to db succesfull");
           }
     });
     app=exp();
     app.use(parser.urlencoded({extended:true}));

     app.use(sessions({
        cookieName: 'authenticated',
        secret: 'first secret',
        duration: 2 * 60 * 60 * 1000
      }));