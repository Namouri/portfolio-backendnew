import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();


app.use(cors());


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running now");
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {

    await resend.emails.send({
      from:"Contact Form <onboarding@resend.dev>",
      to: process.env.MY_EMAIL,

      subject: `Portfolio message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
      replyTo: email,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("EMAIL ERROR:", err);

    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));

