const express = require('express');
require('dotenv').config();

const app = express();
const apiKey = process.env.MY_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Endpoint to send API key to frontend
app.get('/api-key', (_req, res) => {
  res.send(apiKey);
});

// Weather data endpoint
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  try {
    // Dynamisk import() av node-fetch
    const fetch = await import('node-fetch');
    const response = await fetch.default(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
