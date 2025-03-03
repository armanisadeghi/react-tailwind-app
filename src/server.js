const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// In-memory store for HTML
const htmlStore = {};

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint to store HTML
app.post('/store-html', (req, res) => {
  const { html } = req.body;
  if (!html) return res.status(400).json({ error: 'No HTML provided' });
  const id = Date.now().toString(); // Simple ID (use uuid in production)
  htmlStore[id] = html;
  res.json({ id });
});

// Endpoint to retrieve HTML
app.get('/html/:id', (req, res) => {
  const { id } = req.params;
  if (!htmlStore[id]) return res.status(404).json({ error: 'HTML not found' });
  res.send(htmlStore[id]);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));