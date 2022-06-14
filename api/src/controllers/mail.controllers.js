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
        
    if(orderStatus !== "completed" && orderStatus !== "dispatched") {

        res.send("orderStatus no esta completada o despachada");
    }
    
    
    if(orderStatus === "completed") {
        
        const contentHTML = `
        <h1 style="color:blue;font-size:46px;">Thank you for your Purchase</h1>
        <p>Detail:</p>
        <img width="200px" height="200px" src=${image} alt='not found'><img>
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
    
        res.send("mail enviado estado completed");

    } 
    
    if (orderStatus === "dispatched") {
        
        const contentHTML = `
        <h1>Your order has been dispatched!</h1>
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
    
        res.send("mail enviado estado dispatched");

    } 
}

module.exports = {
    sendEmail
}