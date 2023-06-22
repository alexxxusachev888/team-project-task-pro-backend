const nodemailer = require("nodemailer");

const { User } = require("../models/user");

const { ctrlWrapper, handleHttpError } = require("../helpers");

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.UKR_NET_EMAIL,
    pass: process.env.UKR_NET_EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (req, res) => {
  const { email } = req.user;
  const { comment } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw handleHttpError(401, "Email or password is wrong");

  const mailOptions = {
    from: process.env.UKR_NET_EMAIL, // Ваш електронний адрес
    to: "vitalik.nozhenko@gmail.com", // електронний адрес кому відправляємо
    subject: "Допомога",
    text: ` ${comment} \n\nЕлектронна пошта для відповіді:  ${email}`,
  };

  await transporter.sendMail(mailOptions);
  console.log("Лист успішно відправлено");
  res.status(200).json({
    email: email,
    success: true,
    message: "Лист успішно відправлено",
  });
};

module.exports = {
  sendEmail: ctrlWrapper(sendEmail),
};
