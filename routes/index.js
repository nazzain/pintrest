var express = require('express');
var router = express.Router();
const app = express();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require('passport');
const { locals } = require('../app');
const upload = require("./multer");
const  localSrategy =require("passport-local");
passport.use(new localSrategy(userModel.authenticate()));


router.get('/', function(req, res, next){
res.render("index", { title:"express"});
});
router.get('/login',  function (req, res, next){
  res.render("login")
  });

  router.get('/feed',  function (req, res, next){
    res.render("feed")
    });

    router.post('/upload', isLoggedIn, upload.single("file"), async function (req, res, next) {
      if(!req.file){
        res.status(404).send("no file were given");
      }
      // res.send("file uploaded succesfully");
      const user = await userModel.findOne({username: req.session.passport.user});
         const post = await postModel.create({
        image: req.file.filename,
        imageText: req.body.filecaption,
        user: user._id
      });

      user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");

    });

     router.get('/profile', isLoggedIn, async function (req, res, next){
      const user = 
      await userModel.findOne({
        username: req.session.passport.user
      })
      .populate("posts")
      console.log(user);
      res.render("profile", {user});
      });
      router.post('/fileupload', isLoggedIn, upload.single("image"), async function(req, res, next) {
        const user = await userModel.findOne({username: req.session.passport.user});
        user.profileImage = req.file.filename;
        await user.save();
        res.redirect("/profile");
          });
          router.all("/createpost", isLoggedIn, upload.single("postimage"),async function(req, res, next) {
            const user = await userModel.findOne({username: req.passport.user});
            const post = await postModel.create({
              user: user._id,
              title: req.body.title,
              description: req.body.description,
              image: req.file.filename
            });
            user.posts.push(post._id);
            await user.save();
            res.redirect("/profile");
       
          });
          router.get('/add', isLoggedIn, async function (req, res, next){
            const user = await userModel.findOne({
              username: req.session.passport.user
            })
            .populate("posts")
            console.log(user);
            res.render("add", {user});
            });
            router.post('/fileupload', isLoggedIn, upload.single("image"), async function(req, res, next) {
              const user = await userModel.findOne({username: req.session.passport.user});
              user.profileImage = req.file.filename;
              await user.save();
              res.redirect("/profile");
                });
      

     router.post("/register", function (req, res) {
      const { username, email, fullname } = req.body;
      const userData = new userModel({ username, email, fullname });
 
       userModel.register(userData, req.body.password)
      .then(function(){
      passport.authenticate("local")(req, res, function(){
      res.redirect("/profile");
      })
     })
  })

  router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/"
  }), function(req, res){
  });
  router.get("/logout", function(req, res) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    }); 
  })
  
   function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){  
    return next();
    res.redirect("/");
    }
  }
  

module.exports = router;
