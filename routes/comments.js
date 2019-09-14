var express       =require('express');
var router        =express.Router();
var Comment       =require('../models/comment'),
Camp              =require('../models/camp');
    

router.get('/camp_grounds/:id/comments/new',isLoggedIn,function(req,res){
    Camp.findById(req.params.id,function(err,camp){
        if(err)
        {
            console.log(err);
            res.render('camp_grounds');
        }
        else{
            
            res.render('new_comment',{ camp : camp});
        }
    });
    
})

router.post('/camp_grounds/:id/comments',isLoggedIn,function(req,res){
    var username=req.user.username;
    var text=req.body.text;
    Comment.create({text : text,author : username},function(err,comment){
        if(err)
            {
                console.log('Pagla gaya');
                console.log(err);
            }
            else
            {
                Camp.findById(req.params.id,function(err,camp){
                    if(err)
                    console.log(err);
                    else 
                    {console.log(camp);
                    console.log(comment);
                     camp.comments.push(comment);
                     camp.save();
                     res.redirect('/camp_grounds')
                    }
                });
                 
            }
        });
    });


    function isLoggedIn(req,res,next){
        if(req.isAuthenticated())
        {
            return next();
        }
        res.redirect('/login')
    }

    module.exports=router;