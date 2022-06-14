var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bluebirdcommerce@gmail.com",
    pass: "qngdepjfqwgtnzgh",
  },
});
// console.log(transporter, "transporter");

const sendEmail = async (req, res) => {
  const {
    amount,
    shippingAddress,
    orderEmail,
    orderDate,
    orderStatus,
    image,
    customer,
    orderdetails,
  } = req.body;

  const orderImage = orderdetails[0].product.imagecover;

  if (orderStatus !== "completed" && orderStatus !== "dispatched" && orderStatus !== "cancelled") {
    res.send("orderStatus no esta completada, despachada o cancelada");
  }

  if (orderStatus === "completed") {
    const contentHTML = `
    <div style="display: flex;flex-direction: column;align-items: center;border-radius: 15px;text-align: center;background-color: rgb(106, 203, 233);width: 600px;">
    <div style="display: flex;flex-direction: column;align-items: center;border-radius: 15px;text-align: center;background-color: rgb(106, 203, 233);width: 400px;">
    <h1 style="color:white;text-shadow: white 2px 5px;font-size:46px;font-family: sans-serif;">Thank you for your Purchase</h1>
    </div>
    <div style="background-color: white;width: 400px;border-radius: 15px;border-right: 1px solid red;
    border-bottom: 1px solid red;border-top: 1px solid red;">
    <p style="font-family: sans-serif;font-weight: bold;">Detail:</p>
    <img style="border-radius: 50px;width: 30px;" width="200px" height="200px" src=${orderdetails[0].product.imagecover} alt='not found'><img>
    <ul>
    <li style="font-family: sans-serif;font-weight: bold;"> Username: ${orderEmail}</li> <li style="font-family: sans-serif;">Full Name: ${customer.fullName}</li>
    <li style="font-family: sans-serif;font-weight: bold;"> Amount: $ ${amount}</li>
    <li style="font-family: sans-serif;font-weight: bold;"><a href="http://localhost:3000/administration" class="button">Detalle de tu compra</a></li>
    </ul>
    <form action="http://localhost:3000/">
    <input type="submit" value="Purchase Detail" />
    </form>
    </div>
    </div>
        `;

    var mailOptions = {
      from: "bluebirdcommerce@gmail.com",
      to: orderEmail,
      subject: "Sending Email using Node.js",
      html: contentHTML,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send("mail enviado estado completed");
  }

  if (orderStatus === "dispatched") {
    const contentHTML = `
    <div style="display: flex;flex-direction: column;align-items: center;border-radius: 15px;text-align: center;background-color: rgb(106, 203, 233);width: 600px;">
    <div style="display: flex;flex-direction: column;align-items: center;border-radius: 15px;text-align: center;background-color: rgb(106, 203, 233);width: 400px;">
    <h1 style="color:white;text-shadow: white 2px 5px;font-size:46px;font-family: sans-serif;">Your package was sent</h1>
    </div>
    <div style="background-color: white;width: 400px;border-radius: 15px;border-right: 1px solid red;
    border-bottom: 1px solid red;border-top: 1px solid red;">
    <p style="font-family: sans-serif;font-weight: bold;">Detail:</p>
    <img width="30px" height="20px" src=${orderImage} alt='not found'><img>
    <ul>
    <li style="font-family: sans-serif;font-weight: bold;"> Username: ${orderEmail}</li> <li style="font-family: sans-serif;">Full Name: ${customer.fullName}</li>
    <li style="font-family: sans-serif;font-weight: bold;"> Amount: $ ${amount}</li>
    <li style="font-family: sans-serif;font-weight: bold;"><a href="http://localhost:3000/administration" class="button">Detalle de tu compra</a></li>
    </ul>
    <form action="http://localhost:3000/">
    <input type="submit" value="Purchase Detail" />
    </form>
    </div>
    </div>
        `;

    var mailOptions = {
      from: "bluebirdcommerce@gmail.com",
      to: orderEmail,
      subject: "Sending Email using Node.js",
      html: contentHTML,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send("mail enviado estado dispatched");
  }

  if (orderStatus === "cancelled") {
    const contentHTML = `
    <div style="display: flex;flex-direction: column;align-items: center;border-radius: 15px;text-align: center;background-color: rgb(106, 203, 233);width: 600px;">
    <div style="display: flex;flex-direction: column;align-items: center;border-radius: 15px;text-align: center;background-color: rgb(106, 203, 233);width: 400px;">
    <h1 style="color:white;text-shadow: white 2px 5px;font-size:46px;font-family: sans-serif;">Your Order was Cancelled!</h1>
    </div>
    <div style="background-color: white;width: 400px;border-radius: 15px;border-right: 1px solid red;
    border-bottom: 1px solid red;border-top: 1px solid red;">
    <p style="font-family: sans-serif;font-weight: bold;">Please look your order and payments method</p>
    <img style="border-radius: 50%" width="20px" height="20px" src=${orderdetails[0].product.imagecover} alt='not found'><img>
    <ul>
    <li style="font-family: sans-serif;font-weight: bold;"> Username: ${orderEmail}</li> <li style="font-family: sans-serif;">Full Name: ${customer.fullName}</li>
    <li style="font-family: sans-serif;font-weight: bold;"> Amount: $ ${amount}</li>
    <li style="font-family: sans-serif;font-weight: bold;"><a href="http://localhost:3000/administration" class="button">Detalle de tu compra</a></li>
    </ul>
    <form action="http://localhost:3000/administration">
    <input type="submit" value="Purchase Detail" />
    </form>
    </div>
    </div>
        `;

    var mailOptions = {
      from: "bluebirdcommerce@gmail.com",
      to: orderEmail,
      subject: "Sending Email using Node.js",
      html: contentHTML,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send("mail enviado estado dispatched");
  }
};

module.exports = {
  sendEmail,
};
