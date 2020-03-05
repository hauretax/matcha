const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();


app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));

var sess; // global session, NOT recommended
var x = 0;

router.get('/',(req,res) => {
	sess = req.session;	
	res.render('welcome.ejs', {tab: sess.list});
});

router.get('/chat',(req,res) =>{
    sess = req.session;
    if (sess.list == undefined)
    {    sess.list = x++;
        sess.visit = x;
    }
    res.render('chat.ejs', {vis:sess.visit});
});
/*
router.post('/add',(req,res) => {
	sess = req.session;
	if (sess.list == undefined)
	sess.list = "B"
else
	sess.list = sess.list + "AAAAAAAAA'";
	console.log(sess.list);
	//sess.list = sess.list + req.body.newelem;
    res.end('done');
});

router.get('/admin',(req,res) => {
    sess = req.session;
    if(sess.email) {
        res.write(`<h1>Hello ${sess.email} </h1><br>`);
        res.end('<a href='+'/logout'+'>Logout</a>');
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
});


router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});
*/

app.use('/', router);

app.listen(process.env.PORT || 3000,() => {
    console.log(`App Started on POOORT ${process.env.PORT || 3000}`);
});