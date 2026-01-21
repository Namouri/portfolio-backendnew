import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";


dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Portfolio message from ${name}`,
      text: message,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));

/*
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // change if not Gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Email options
  const mailOptions = {
    from: `"${name}" <${email}>`, // sender
    to: 'nouramouri15@gmail.com',   // your email
    subject: `Portfolio Contact Form: ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  };

  try {
      console.log("Sending email...");

    await transporter.sendMail(mailOptions);
    console.log("Email sent:", mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

app.post("/contact", async (req, res) => {
  console.log("Form submitted:", req.body); // <--- make sure this prints
  res.status(200).json({ success: true });
});
*/