var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/hello',function(req,res){
	res.render('hello',{title:"Hello"})
});

router.get('/sample',function(req,res){
	res.render('sample',{title:"Sample"})
});

router.get('/users',function(req,res){
	var db = req.db;
	var collection = db.get("usercollection");
	collection.find({},{},function(e,docs){
		res.render('users',{'users':docs});
	});

});

router.get('/newUser',function(req,res){
	res.render('newUser',{title:'add new user'});
});

/*Post to add user*/

router.post('/adduser',function(req,res){
	//set initial db variable
	var db=req.db;
	//Get form values. depends on name atrribute
	 var username = req.body.username;
	 var email = req.body.email;

	 //set collection
	 var collection = db.get("usercollection");

	 //submit to db
	 collection.insert({"username":username,"email":email},function(err,doc){
	 	if(err){
	 		res.send("There was a problem adding to database");
	 	}
	 	else{
	 		res.location("users");
	 		res.redirect("users");
	 	}
	 });
});

module.exports = router;
