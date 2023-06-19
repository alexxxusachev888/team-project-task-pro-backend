const nodemailer = require('nodemailer');

const config = {
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
      user: process.env.UKR_NET_EMAIL,
      pass: process.env.UKR_NET_EMAIL_PASSWORD,
    },
  };

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
    const email = {...data, from: process.env.UKR_NET_EMAIL};
    await transporter.sendMail(email);
    return true;
}

module.exports = sendEmail;