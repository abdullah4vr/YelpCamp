var exp               =require('express'),
    parser            =require('body-parser'),
    seedDB            =require('./seed'),  
    mongoose          =require('mongoose'),
    passport          =require('passport'),
    LocalStratergy    =require('passport-local'),
    campRoutes        =require('./routes/camp_grounds'),
    commentRoutes     =require('./routes/comments'),
    indexRoutes       =require('./routes/index')
    User              =require('./models/user');
    mongoose.connect('mongodb://localhost:27017/YelpCamp',{ useNewUrlParser: true },function(err){
        if(err)
        console.log(err)
           else{
           console.log("Ho rha h");
           }
     });

 
var app=exp();
app.set('view engine','ejs');


//==============================================
//middleware initializations
app.use(parser.urlencoded({extended:true}));

        //Authentication Configuration//
//=======================================
app.use(require('express-session')({
    secret : 'kkfjdgudgsclzxhoasjcauf',
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//==========================================
//Middle ware config

app.use(function(req,res,next){
    res.locals.user = req.user;
    console.log(req.user);
     next();
    });
//routes
app.use(indexRoutes);
app.use(campRoutes);
app.use(commentRoutes);

//=======================================
app.listen(12000,function()
{
    console.log('Yelp Camp Has Started');
});
//====================================



seedDB();
