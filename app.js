const express = require('express');
var nodemailer = require('nodemailer');
const log = console.log;
const app = express();
const path = require('path');

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

var transport = {
  service: 'gmail',
  auth: {
    user: 'eduweb2020ca@gmail.com',
    pass: 'EDUWEB2020'
  }
}

var transporter = nodemailer.createTransport(transport)

app.post('/email', (req, res) => {

const {Name, subject, email, text } = req.body;
 console.log('Data: ',  req.body);

 var mail1 = {
     from: Name,
     to: email,  //Change to email address that you want to receive messages on
     subject: 'Mail Received!',
     text: "Mail Received, we get back to you as soon as possible!"
 }

 var content = `name: ${Name} \n email: ${email} \n message: ${text} `
console.log(content);
 var mail2 = {
     from: 'eduwebch@gmail.com',
     to: 'eduwebch@gmail.com',  //Change to email address that you want to receive messages on
     subject: 'A new client input',
     text: content
 }

 transporter.verify((error, success) => {
   if (error) {
     console.log("Here");
     console.log(error);
   } else {
     // console.log('Server is ready to take messages');
     transporter.sendMail(mail1, (err, data)=>{
       if(err){
         console.log(err);
       }else{
          console.log("success1");
       }
     });

     transporter.sendMail(mail2, (err, data)=>{
       if(err){
         console.log(err);
         res.redirect('/contact');
       }else{
         console.log("success2");
         // res.json({ message: 'Email sent!!!' });
         res.redirect('/');
       }
     })
   }
 });
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'eduweb.html'));
});

app.get('/courses', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'courses.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'accounts.html'));
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => console.log('Server is running...', port));
