const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');  // For handling file paths
const fs = require('fs');  // For file system operations
const fileUpload = require('express-fileupload');  // Import express-fileupload middleware
const {db} = require('./src/db/index.ts')
const { usersTable } = require('./src/db/schema.ts');  // Import your schema
const dotenv = require('dotenv');

dotenv.config(); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Handle form data
app.use(fileUpload());

// Enable CORS for all origins
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'OPTIONS'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

// Initialize Supabase client with environment variables
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Function to generate a JWT secret using email + constant string
const generateJwtSecret = (email) => {
  const constant = process.env.JWT_SECRET_CONSTANT; 
  return `${email}${constant}`;
};

// Endpoint to handle profile setup with image upload
app.post('/profile-setup', async (req, res) => {
  const { name, email } = req.body;
  const image = req.files?.profilePicture;  // Use fileUpload to handle file input

  if (!name || !email || !image) {
    return res.status(400).json({ error: 'Name, email, and profile picture are required.' });
  }

  try {
    // Save the image to the uploads directory on the server
    const uploadPath = path.join(__dirname, 'uploads', image.name);
    image.mv(uploadPath, async (err) => {
      if (err) return res.status(500).json({ error: 'Failed to upload image' });

      const imageUrl = `http://localhost:3000/uploads/${image.name}`;  // Generate URL to serve the image
      
      // Insert user data into the database using Drizzle ORM
      await db.insert(usersTable).values({
        name,
        email,
        profilePicture: imageUrl,
      }).onConflictDoNothing();  // Avoid duplicate users

      res.status(200).json({ message: 'Profile setup complete', profilePicture: imageUrl });
    });
  } catch (error) {
    console.error('Error setting up profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve the uploads folder statically so images can be accessed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint to send OTP via phone
app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;

  if (!phone || !/^\+\d{10,15}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format. Use E.164 format like +919821939864' });
  }

  try {
    const { error } = await supabase.auth.signInWithOtp({ phone });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to verify OTP and generate JWT via phone
app.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !/^\+\d{10,15}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format. Use E.164 format like +919821939864' });
  }

  if (!otp) {
    return res.status(400).json({ error: 'OTP is required' });
  }

  try {
    const { data, error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Generate JWT using a secret created from email and constant string
    const email = data.user.email || '';  // Assuming the user has an email
    const secret = generateJwtSecret(email);
    const token = jwt.sign({ userId: data.user.id, phone }, secret, { expiresIn: '1h' });

    res.status(200).json({ message: 'OTP verified successfully', token, user: data.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to send OTP via email
app.post('/send-email-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'OTP sent to email successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to verify OTP and generate JWT via email
app.post('/verify-email-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
    const { data, error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Generate JWT using a secret created from email and constant string
    const secret = generateJwtSecret(email);
    const token = jwt.sign({ userId: data.user.id, email }, secret, { expiresIn: '1h' });

    res.status(200).json({ message: 'OTP verified successfully', token, user: data.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
