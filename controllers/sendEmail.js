const nodemailer = require('nodemailer');

const { User } = require('../models/user');

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

  const user = await User.findOne({ email });
  if (!user) throw handleHttpError(401, 'Email or password is wrong');

  const mailOptions = {
    from: process.env.UKR_NET_EMAIL, // Ваш електронний адрес
    to: 'vitalik.nozhenko@gmail.com', // електронний адрес кому відправляємо
    subject: 'Help',
    text: `${comment}\n\nUser email to response: ${email}`,
  };

  await transporter.sendMail(mailOptions);
  console.log('Message sent successfully');
  res.status(200).json({
    email: email,
    success: true,
    message: 'Message sent successfully',
  });
};

module.exports = {
  sendEmail: ctrlWrapper(sendEmail),
};
