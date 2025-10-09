import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test MySQL connection
pool.getConnection()
  .then(connection => {
    console.log('⚡️ MySQL database connected successfully!');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Failed to connect to MySQL database:', err.stack);
  });

// Nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'garagefixcare@gmail.com',
      pass: process.env.EMAIL_PASS || 'abrmihffahcqeund'
    }
  });
};

// ======================== API ENDPOINTS ========================

// Book Service
app.post('/api/book-service', async (req, res) => {
  try {
    const {
      name, email, phone, address, city, zipCode,
      vehicleMake, vehicleModel, vehicleYear,
      serviceType, preferredDate, preferredTime, description
    } = req.body;

    const transporter = createTransporter();

    const emailContent = `
      <h2>🚗 New Service Booking Request</h2>
      <h3>Customer Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
      </ul>
      <h3>Service Location:</h3>
      <ul>
        <li><strong>Address:</strong> ${address}</li>
        <li><strong>City:</strong> ${city}</li>
        <li><strong>ZIP Code:</strong> ${zipCode}</li>
      </ul>
      <h3>Vehicle Details:</h3>
      <ul>
        <li><strong>Year:</strong> ${vehicleYear}</li>
        <li><strong>Make:</strong> ${vehicleMake}</li>
        <li><strong>Model:</strong> ${vehicleModel}</li>
      </ul>
      <h3>Service Details:</h3>
      <ul>
        <li><strong>Service Type:</strong> ${serviceType}</li>
        <li><strong>Preferred Date:</strong> ${preferredDate}</li>
        <li><strong>Preferred Time:</strong> ${preferredTime}</li>
      </ul>
      ${description ? `<h3>Additional Details:</h3><p>${description}</p>` : ''}
      <hr>
      <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'garagefixcare@gmail.com',
      subject: `🚗 New Service Booking: ${name} - ${serviceType}`,
      html: emailContent
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Booking request submitted successfully!' });

  } catch (error) {
    console.error('Error processing booking:', error);
    res.status(500).json({ success: false, message: 'Failed to process booking request' });
  }
});

// Quick Book
app.post('/api/quick-book-service', async (req, res) => {
  let connection;
  try {
    const { phoneNumber, serviceType } = req.body;
    if (!phoneNumber || !serviceType) {
      return res.status(400).json({ success: false, message: 'Phone number and service type are required' });
    }

    connection = await pool.getConnection();
    const sql = `
      INSERT INTO quick_bookings (phone_number, service_type, submitted_at)
      VALUES (?, ?, NOW())
    `;
    await connection.execute(sql, [phoneNumber, serviceType]);
    console.log(`✅ Quick booking saved: ${phoneNumber} - ${serviceType}`);

    const transporter = createTransporter();
    const emailContent = `
      <h2>⚡ New Quick Booking</h2>
      <p><strong>Phone:</strong> ${phoneNumber}</p>
      <p><strong>Service:</strong> ${serviceType}</p>
      <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
    `;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'garagefixcare@gmail.com',
      subject: `⚡ Quick Booking from ${phoneNumber}`,
      html: emailContent
    };
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Quick booking submitted successfully!' });

  } catch (error) {
    console.error('❌ Error in quick-book-service:', error);
    res.status(500).json({ success: false, message: 'Failed to submit quick booking' });
  } finally {
    if (connection) connection.release();
  }
});

// Contact form
app.post('/api/contact', async (req, res) => {
  let connection;
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }

    connection = await pool.getConnection();
    const sql = `
      INSERT INTO contact_submissions (name, email, phone, subject, message, submitted_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    await connection.execute(sql, [name, email, phone, subject, message]);
    console.log(`✅ Contact form submitted by ${name} (${email}) saved.`);

    const transporter = createTransporter();
    const emailContent = `
      <h2>📧 New Contact Form Submission</h2>
      <h3>Contact Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
        <li><strong>Subject:</strong> ${subject}</li>
      </ul>
      <h3>Message:</h3>
      <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007acc;">
        ${message}
      </p>
      <hr>
      <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
    `;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'garagefixcare@gmail.com',
      subject: `📧 Contact Form: ${subject} - ${name}`,
      html: emailContent
    };
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Message sent and saved successfully!' });

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({ success: false, message: 'Failed to send message or save to database' });
  } finally {
    if (connection) connection.release();
  }
});

// Join Us
app.post('/api/join-us', async (req, res) => {
  let connection;
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    connection = await pool.getConnection();
    const sql = 'INSERT INTO join_us_submissions (phone_number, submitted_at) VALUES (?, NOW())';
    await connection.execute(sql, [phoneNumber]);
    console.log(`✅ Join Us: ${phoneNumber} saved.`);

    const transporter = createTransporter();
    const emailContent = `
      <h2>📞 New Join Us Request</h2>
      <ul><li><strong>Phone:</strong> ${phoneNumber}</li></ul>
      <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
    `;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'garagefixcare@gmail.com',
      subject: `📞 New Join Us Request from: ${phoneNumber}`,
      html: emailContent
    };
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Join Us request submitted successfully!' });

  } catch (error) {
    console.error('❌ Error in join-us:', error);
    res.status(500).json({ success: false, message: 'Failed to process request' });
  } finally {
    if (connection) connection.release();
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ======================== FRONTEND SERVE ========================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 since dist is outside server folder
app.use(express.static(path.join(__dirname, '../dist')));

// React Router handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚗 GarageFixCare API running on port ${PORT}`);
  console.log(`📧 Emails will be sent to: garagefixcare@gmail.com`);
});
