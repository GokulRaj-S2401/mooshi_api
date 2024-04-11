require('dotenv').config();
const express = require('express');
const fileRouter = require('./Router/fileRouter');

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(express.json());
app.use('/api/files', fileRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
