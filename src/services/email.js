const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendAlert = async (apiName, url) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `🚨 API DOWN: ${apiName}`,
      text: `The API "${apiName}" at ${url} is not responding.`
    });

    console.log(`📧 Alert email sent for ${apiName}`);
  } catch (error) {
    console.error("Email error:", error.message);
  }
};

module.exports = sendAlert;