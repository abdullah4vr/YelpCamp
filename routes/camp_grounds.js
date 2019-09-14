var express=require('express');
var router=express.Router(),
Camp              =require('../models/camp');


router.get('/camp_grounds/new',isLoggedIn,function(req,res){
    res.render('new_camp');
});

router.get('/camp_grounds/:id',function(req,res){
    console.log(req.params.id)
    Camp.findById(req.params.id).populate("comments").exec(function(err,camp){
        if(err)
          {
              console.log("Error occured "+err);
          }
      else{
        console.log(camp);
        res.render('single_camp',{camp : camp});
              }
            });
        });

router.get('/camp_grounds',function(req,res){
    
    Camp.find({},function(err,camps){
        if(err)
          {
              console.log("Error occured "+err);
          }
      else{
        res.render('camps',{camps : camps});
              }
          });
    
});


router.post('/camp_grounds',function(req,res){
         var name=req.body.name;
         var image=req.body.image;
         var desc=req.body.description;
         var insert_camp={name:name,image:image,description : desc};
         Camp.create(insert_camp,function(err,cat){
            if(err)
                {
                    console.log("Error occured "+err);
                }
            else{
                    console.log("Cat inserted...."+cat);
                }
            });
         res.redirect('/camp_grounds');
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/login')
}

module.exports=router;