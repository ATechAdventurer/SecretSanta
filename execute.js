let mailer = require('nodemailer');
let config = require('./config');

let connector = mailer.createTransport({
  service: "gmail",
  auth: {
    user: config.gmailUser,
    pass: config.gmailPassword
  }
});

function shuffle(users) {
    let a = users;
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


let sender = [
  /*{fname: "Abby", lname: "Strebel",email:"abbytheabb@gmail.com"},
  {fname: "Cameron", lname: "Steele", email: "Cam.steeleis+Cam@gmail.com"},
  {fname: "Seven", lname: "Glazkova", email: "anyabassett1@gmail.com"},
  {fname: "William", lname: "Johnson", email: "willtjohnson@outlook.com"},
  {fname: "Jacob", lname: "Lancaster", email: "jakelanc950@gmail.com"},
  {fname: "Andrew", lname: "Trewin", email: "zancoproductions@gmail.com"},
  {fname: "Oskari", lname: "Pirhonen", email: "oskari.pirhonen@gmail.com"},
  {fname: "Garrett", lname: "Battaglia", email: "garrett@garrettbattaglia.info"},
  {fname: "Jacob",  lname: "Cherry", email: "jacobcherry36@gmail.com"},
  */
]
function execute(senders){
sender = shuffle(sender);
for(var i = 0; i < sender.length; i++){
  let sboi = sender[i];
  let rboi = sender[(i+1) % sender.length];
  let mailOptions = {
    from: '"Mighty Enarc 🏗️" <enarclabs@gmail.com>', // sender address
    to: `${sboi.email}`,
    subject: `🎁 Followers Of Enarc Secret Santa [Update] 🎁`, // Subject line
    html: `<center>Hey ${sboi.fname}, you're giving a gift to:<h1>${rboi.fname + ' ' + rboi.lname}</h1><br><p>We had a glitch and one of our members wasn't added properly</p><br><p>Check <a href="slack://channel?team=T6BRU1CLQ&id=C8A5TPK0B" href="https://followersofenarc.slack.com/messages/C8A5TPK0B/" href="slack://channel?team=T6BRU1CLQ&id=C8A5TPK0B">#secret-santa</a> to find out more about what ${rboi.fname} wants.</p></center>`// plain text body
  };
  connector.sendMail(mailOptions, function (err, info) {
    if(err)
    console.log(err)
    else
    console.log(info);
  });
}
};


module.exports = execute;
