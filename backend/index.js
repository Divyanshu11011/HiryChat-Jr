const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();  // Load environment variables from .env

const app = express();
app.use(express.json());

// Initialize Supabase client with environment variables
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Endpoint to send OTP
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

// Endpoint to verify OTP
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

    res.status(200).json({ message: 'OTP verified successfully', user: data.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to send OTP to email
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

// Endpoint to verify OTP sent to email
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
  
      res.status(200).json({ message: 'OTP verified successfully', user: data.user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  const server = http.createServer(app);
  setupSocketIO(server);
  

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
