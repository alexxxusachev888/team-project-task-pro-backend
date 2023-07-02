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
    from: process.env.UKR_NET_EMAIL,
    to: [email, 'taskpro.project@gmail.com'],
    subject: 'Help',
    text: comment,
    replyTo: email,
  };

  await transporter.sendMail(userEmail, (error, info) => {
    if (error) {
      throw handleHttpError(400, `Email error: ${error.message}`);
    }
  });
  res.status(200).json({ message: 'Message sent successfully' });
};

module.exports = {
  sendEmail: ctrlWrapper(sendEmail),
};
