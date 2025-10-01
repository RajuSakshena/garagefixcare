import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jackmyble@9212",
  database: "GarageFixCare"
});

db.connect(err => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// API route
app.post("/api/book-service", (req, res) => {
  const {
    name, email, phone, address, city,
    zipCode, vehicleMake, vehicleModel, vehicleYear,
    serviceType, preferredDate, preferredTime, description
  } = req.body;

  const sql = `INSERT INTO bookings 
    (name, email, phone, address, city, zipCode, vehicleMake, vehicleModel, vehicleYear, serviceType, preferredDate, preferredTime, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    name, email, phone, address, city, zipCode,
    vehicleMake, vehicleModel, vehicleYear, serviceType,
    preferredDate, preferredTime, description
  ], (err, result) => {
    if (err) {
      console.error("Error saving booking:", err);
      return res.status(500).json({ success: false, error: "Database error" });
    }

    // ✅ Booking saved, now try sending email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "garagefixcare@gmail.com",
        pass: "abrmihffahcqeund" // ✅ No spaces
      }
    });

    const mailOptions = {
      from: "garagefixcare@gmail.com",
      to: "garagefixcare@gmail.com",
      subject: "New Booking Received",
      text: `New booking from ${name}, Phone: ${phone}, Service: ${serviceType}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
        // ✅ Still return success because booking is saved
        return res.json({ success: true, message: "Booking saved, but email failed" });
      } else {
        console.log("Email sent:", info.response);
        res.json({ success: true, message: "Booking saved & notification sent" });
      }
    });
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
