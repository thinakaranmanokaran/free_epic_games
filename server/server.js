// server.js
const express = require('express');
const epicFreeGames = require('epic-free-games'); // Import the epic-free-games package

const app = express();

// Endpoint to fetch free Epic Games
app.get('/api/free-games', async (req, res) => {
  try {
    // Fetch free games data using the epic-free-games package
    const freeGames = await epicFreeGames();
    
    // Send the free games data as a JSON response
    res.json(freeGames);
  } catch (error) {
    console.error('Error fetching free games:', error);
    res.status(500).json({ message: 'Failed to fetch free games' });
  }
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
