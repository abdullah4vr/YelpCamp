var express           =require('express');
var router            =express.Router();
var passport          =require('passport'),    
    User              =require('../models/user');
    



router.get('/',function(req,res){
    res.render('landing');
});

    //===============================================
    //      SignUp Routes

    router.post('/signup',function(req,res){
        
       User.register(new User({username : req.body.username}),req.body.password,function(err,user){
           if(err)
           {
               console.log("Pata nhi kya ho rha h yaar");
               console.log(err);
               return res.render('signup');
           }
           passport.authenticate("local")(req,res,function(){
               res.redirect('/camp_grounds');
           });
       });
    });

    router.get('/signup',function(req,res){
             res.render('signup');
    });




    //===============================
    //Login routes

    router.get('/login',function(req,res){
        res.render('login');
    });

    router.post("/login",passport.authenticate("local",
    {
        successRedirect : '/camp_grounds',
        failureRedirect : '/login'
    }),function(req,res){                 
    });

    //===================================

    //logout routes
    router.get('/logout',function(req,res){
        req.logout();
        res.redirect('/camp_grounds');
    });


  module.exports =router;