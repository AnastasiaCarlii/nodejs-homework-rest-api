const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, BASE_URL } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "newmailforwork@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

async function sendEmail(verificationCode) {
  const email = {
    to: "nastjaorosszul@gmail.com",
    from: "newmailforwork@meta.ua",
    subject: "Please, verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click  verify email</a>`,
  };

  await transport.sendMail(email);

  return true;
}

module.exports = { sendEmail };
