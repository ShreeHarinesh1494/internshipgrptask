const axios = require('axios');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const loginHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Step 1: Call Spring Boot login API
  
    const response = await axios.post(process.env.SPRING_BOOT_API, {
      username,
      password
    });

    const userData = response.data;

    // Step 2: Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Step 3: Send OTP to email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    await transporter.sendMail({
      from: `"IoT App" <${process.env.EMAIL_USER}>`,
      to: userData.email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`
    });

    // Step 4: Create JWT token with user data and OTP (you may also store OTP in DB)
    const token = jwt.sign({ username, otp }, process.env.JWT_SECRET, { expiresIn: '10m' });

    res.status(200).json({ message: "OTP sent",otp, token,username});

  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: 'Login or Email failed' });
  }
};

module.exports = { loginHandler };
