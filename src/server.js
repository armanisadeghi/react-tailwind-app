const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const htmlStore = {};

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/store-html', (req, res) => {
  const { html } = req.body;
  if (!html) return res.status(400).json({ error: 'No HTML provided' });
  const id = Date.now().toString();
  htmlStore[id] = html;
  res.json({ id });
});

app.get('/html/:id', (req, res) => {
  const { id } = req.params;
  if (!htmlStore[id]) return res.status(404).json({ error: 'HTML not found' });
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="/styles.css">
      <title>Generated HTML</title>
    </head>
    <body>
      ${htmlStore[id]}
    </body>
    </html>
  `);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));