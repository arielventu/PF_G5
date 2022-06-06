var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bluebirdcommerce@gmail.com',
    pass: 'qngdepjfqwgtnzgh'
  }
});
// console.log(transporter, "transporter");

const sendEmail = async (req, res) => {
    const { amount, shippingAddress, orderEmail, orderDate, orderStatus, image } =
    req.body;

    const contentHTML = `
    <h1>Thank you for your Purchase</h1>
    <p>Detail:</p>
    <img src=${image} alt='not found'><img>
    <ul>
    <li> Username: ${orderEmail}</li>
    <li> Amount: ${amount}</li>
    </ul>
    `;

    var mailOptions = {
        from: 'bluebirdcommerce@gmail.com',
        to: orderEmail,
        subject: 'Sending Email using Node.js',
        html: contentHTML
    }
    ;

    await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });

    res.send("mail enviado");
}

module.exports = {
    sendEmail
}