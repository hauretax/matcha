const express = require('express');
var http = require('http');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
var server = http.createServer(app);
const io = require('socket.io').listen(server);

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));

var sess; // global session, NOT recommended
var x = 0;




io.sockets.on('connection',function (socket){
    socket.on('message', function(message){
        console.log(message);
        socket.broadcast.emit('message', message);
    })
})

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

app.use('/', router);

app.listen(process.env.PORT || 3000,() => {
    console.log(`App Started on POOORT ${process.env.PORT || 3000}`);
});