const nodemailer = require('nodemailer');

const { ctrlWrapper, handleHttpError } = require('../helpers');

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

const sendEmail = async (req, res) => {
  const { email, comment } = req.body;

  const userEmail = {
    from: process.env.UKR_NET_EMAIL, // Ваш електронний адрес
    // to: 'taskpro.project@gmail.com', // електронний адрес кому відправляємо
    to: email, // електронний адрес кому відправляємо
    subject: 'Help',
    text: `${comment}\n\nUser email to response: ${email}`,
  };

  await transporter.sendMail(userEmail);
  res.status(200).json({ message: 'Message sent successfully' });
};

module.exports = {
  sendEmail: ctrlWrapper(sendEmail),
};
