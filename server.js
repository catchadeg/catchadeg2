const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define route to fetch photos from the database (replace this with your actual route)
app.get('/photos', (req, res) => {
  // Your logic to fetch photos from the database
  // This is just a placeholder
  const photos = [{ url: 'https://example.com/photo1.jpg', tags: 'Tag 1' }];
  res.json(photos);
});

// Define a wildcard route to serve index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
