const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Servidor en el puerto 3000!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>ForgetNot Email Testing</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`Correo enviado con ID: ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"Forget Not"<serveremailforgernot@gmail.com>', // sender address
    to: user.email + ", alpbetomesolutions@gmail.com",  // list of receivers
    subject: "Consulta a Forget Not", // Subject line
    html: `<h1>Mensaje de usuario ${user.name} a AlphaBetaOmega</h1><br>
           <p>${user.message}</p>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

