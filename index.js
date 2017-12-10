let execute = require('./execute');
let storage = require('node-persist');
let config = require('./config');
let app = require('express')();
let bodyParser = require('body-parser');
let {TITLE, GMAIL_USER, GMAIL_PASS, GMAIL_FRIENDLY_NAME, ADMIN_PASS} = config;
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/signup', function(req, res){
  let {} = config;
  let body = `<html>
    <head>
      <title>${config.title}</title>
      <script src="https://use.fontawesome.com/d4a002a577.js"></script>
      <style>
        body{
            padding-top: 30px;
            margin: auto;
            background-color: 212625;
            color: azure;
            font-smooth: auto;
            font-family: 'Roboto', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .heading{
            text-align: center;

        }
        .holder{
            margin: auto;

            padding-left: 5px;
            padding-right: 5px;
            width: 80vw;
            max-width: 1000px;
            min-height: 60vh;
        }
        .form-style{
            font-family: 'Open Sans Condensed', arial, sans;
            width: 500px;
            padding: 30px;
            background: #FFFFFF;
            margin: 50px auto;
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
            -moz-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
            -webkit-box-shadow:  0px 0px 15px rgba(0, 0, 0, 0.22);

        }
        .form-style h2{
            background: #4D4D4D;
            text-transform: uppercase;
            font-family: 'Open Sans Condensed', sans-serif;
            color: #797979;
            font-size: 18px;
            font-weight: 100;
            padding: 20px;
            margin: -30px -30px 30px -30px;
        }
        .form-style input[type="text"],
        .form-style input[type="date"],
        .form-style input[type="datetime"],
        .form-style input[type="email"],
        .form-style input[type="number"],
        .form-style input[type="search"],
        .form-style input[type="time"],
        .form-style input[type="url"],
        .form-style input[type="password"],
        .form-style textarea,
        .form-style select
        {
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            outline: none;
            display: block;
            width: 100%;
            padding: 7px;
            border: none;
            border-bottom: 1px solid #ddd;
            background: transparent;
            margin-bottom: 10px;
            font: 16px Arial, Helvetica, sans-serif;
            height: 45px;
        }
        .form-style textarea{
            resize:none;
            overflow: hidden;
        }
        .form-style input[type="button"],
        .form-style input[type="submit"]{
            -moz-box-shadow: inset 0px 1px 0px 0px #45D6D6;
            -webkit-box-shadow: inset 0px 1px 0px 0px #45D6D6;
            box-shadow: inset 0px 1px 0px 0px #45D6D6;
            background-color: #2ecc71;
            border: 1px solid #2ecc71;
            display: inline-block;
            border-radius: 5px;
            cursor: pointer;
            color: #FFFFFF;
            font-family: 'Open Sans Condensed', sans-serif;
            font-size: 14px;
            padding: 8px 18px;
            text-decoration: none;
            text-transform: uppercase;
        }
        .form-style input[type="button"]:hover,
        .form-style input[type="submit"]:hover {
            background:linear-gradient(to bottom, #2ecc71 5%, #2ecc71 100%);
            background-color:#34CACA;
        }
        span.love{
            color: #999;
            font-size: 12px;
            width: 90%;
            left: 50%;
            top: 45%;
            bottom: auto;
            right: auto;
            transform: translateX(-50%) translateY(-50%);
            text-align: center;
        }
         span a.love{
            color: azure;
            text-decoration: none;
        }
        span .fa.love{
            color: #E90606;
            margin: 0 3px;
            font-size: 10px;
            animation: pound 0.35s infinite alternate;
            -webkit-animation: pound 0.35s infinite alternate;
        }

        @-webkit-keyframes pound {
            to {
                transform: scale(1.1);
            }
        }
        @keyframes pound {
            to {
                transform: scale(1.1);
            }
        }</style>
    </head>
    <body>
      <h2 class="heading">${TITLE}</h2>
      <div class="holder">
    <div class="form-style">
        <form action="/signup" method="post">
            <input type="text" name="firstName" placeholder="First name" required />
            <input type="text" name="lastName" placeholder="Last name" required />
            <input type="email" name="email" placeholder="Email" required />
            <center><input type="submit" value="Join" /></center>
        </form>
    </div>
    <center>
        <span class="love">
    Made with <i class="fa fa-heart pulse love"></i> in <a href="https://www.google.de/maps/place/Richardson,+TX/@32.9641134,-96.7610917,12z/data=!4m5!3m4!1s0x864c1ee979bea767:0x2cdb29c046270495!8m2!3d32.9483335!4d-96.7298519" class="love" target="_blank">Texas</a>
        </span>
    </center>
    </div>
    </body></html>`;
  res.send(body);
});


app.get('/admin', function(req, res) {
  res.send(`
  <form action="/admin" method="post">
      <input type="password" name="password" placeholder="Password" required />
      <center><input type="submit" value="Execute The Mailer" /></center>
  </form>`);
  
});


app.post('/admin', function(req, res) {
  let {password} = req.body;
  if(ADMIN_PASS === password){
    execute();
    res.send("Success");
  }else{
    res.send("Wrong Password");
  }
  
});

app.get('/test', function(req, res) {
  storage.initSync();
  let data = storage.getItemSync('users');
  res.send(data);
});

app.post('/signup', function(req, res){
  storage.initSync();
  let {firstName, lastName, email} = req.body;
  let data = storage.getItemSync('users');
  if(!data){
    data = []; 
  }
  data.push({firstName,lastName,email});
  storage.setItemSync('users', data);
  let body = `
<html>
  <head>
    <title></title>
    <script src="https://use.fontawesome.com/d4a002a577.js"></script>
    <style>
        body{
            padding-top: 30px;
            margin: auto;
            background-color: 212625;
            color: azure;
            font-smooth: auto;
            font-family: 'Roboto', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .heading{
            text-align: center;

        }
        .holder{
            margin: auto;
            padding-left: 5px;
            padding-right: 5px;
            width: 80vw;
            max-width: 1000px;
            min-height: 60vh;
        }
        .form-style{
            font-family: 'Open Sans Condensed', arial, sans;
            width: 500px;
            padding: 30px;
            background: #FFFFFF;
            margin: 50px auto;
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
            -moz-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
            -webkit-box-shadow:  0px 0px 15px rgba(0, 0, 0, 0.22);

        }
        .form-style h2{
            text-transform: uppercase;
            font-family: 'Open Sans Condensed', sans-serif;
            color: black;
            font-size: 18px;
            font-weight: 100;
            padding: 20px;
            margin: -30px -30px 30px -30px;
        }
        .form-style p{
            text-transform: uppercase;
            font-family: 'Open Sans Condensed', sans-serif;
            color: black;
            text-align: center;
            font-size: 8pt;
        }
        .form-style input[type="text"],
        .form-style input[type="date"],
        .form-style input[type="datetime"],
        .form-style input[type="email"],
        .form-style input[type="number"],
        .form-style input[type="search"],
        .form-style input[type="time"],
        .form-style input[type="url"],
        .form-style input[type="password"],
        .form-style textarea,
        .form-style select
        {
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            outline: none;
            display: block;
            width: 100%;
            padding: 7px;
            border: none;
            border-bottom: 1px solid #ddd;
            background: transparent;
            margin-bottom: 10px;
            font: 16px Arial, Helvetica, sans-serif;
            height: 45px;
        }
        .form-style textarea{
            resize:none;
            overflow: hidden;
        }
        .form-style input[type="button"],
        .form-style input[type="submit"]{
            -moz-box-shadow: inset 0px 1px 0px 0px #45D6D6;
            -webkit-box-shadow: inset 0px 1px 0px 0px #45D6D6;
            box-shadow: inset 0px 1px 0px 0px #45D6D6;
            background-color: #2ecc71;
            border: 1px solid #2ecc71;
            display: inline-block;
            border-radius: 5px;
            cursor: pointer;
            color: #FFFFFF;
            font-family: 'Open Sans Condensed', sans-serif;
            font-size: 14px;
            padding: 8px 18px;
            text-decoration: none;
            text-transform: uppercase;
        }
        .form-style input[type="button"]:hover,
        .form-style input[type="submit"]:hover {
            background:linear-gradient(to bottom, #2ecc71 5%, #2ecc71 100%);
            background-color:#34CACA;
        }
        span.love{
            color: #999;
            font-size: 12px;
            width: 90%;
            left: 50%;
            top: 45%;
            bottom: auto;
            right: auto;
            transform: translateX(-50%) translateY(-50%);
            text-align: center;
        }
         span a.love{
            color: azure;
            text-decoration: none;
        }
        span .fa.love{
            color: #E90606;
            margin: 0 3px;
            font-size: 10px;
            animation: pound 0.35s infinite alternate;
            -webkit-animation: pound 0.35s infinite alternate;
        }

        @-webkit-keyframes pound {
            to {
                transform: scale(1.1);
            }
        }
        @keyframes pound {
            to {
                transform: scale(1.1);
            }
        }

    </style>
    </head>
    <body>
  <h2 class="heading">🎁 Follower Of Enarc Secret Santa 🎁</h2>
  <div class="holder">
    <div class="form-style">
        <h2 style="text-align: center;">Success</h2>
        <p>You will receive an email when the secret santa's are chosen</p>
    </div>
    <center>
        <span class="love">
    Made with <i class="fa fa-heart pulse love"></i> in <a href="https://www.google.de/maps/place/Richardson,+TX/@32.9641134,-96.7610917,12z/data=!4m5!3m4!1s0x864c1ee979bea767:0x2cdb29c046270495!8m2!3d32.9483335!4d-96.7298519" class="love" target="_blank">Texas</a>
        </span>
    </center>
    </div>
    </body>
</html>`;
  res.send(body);
});
app.listen(8080);
